#!/bin/bash
set -e

# ========================================
# UnicornX Deploy Script
# Domain: unicornx.fun
# Email: egor4042007@gmail.com
# ========================================

DOMAIN="unicornx.fun"
EMAIL="egor4042007@gmail.com"
APP_DIR="/var/www/unicornx"
REPO_DIR="/opt/unicornx-source"

echo "========================================="
echo "  UnicornX Deployment Script"
echo "  Domain: $DOMAIN"
echo "========================================="

# --- 1. System Update & Dependencies ---
echo ""
echo "[1/7] Updating system and installing dependencies..."
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl git nginx certbot python3-certbot-nginx ufw

# --- 2. Install Node.js (v20 LTS) ---
echo ""
echo "[2/7] Installing Node.js 20 LTS..."
if ! command -v node &> /dev/null || [[ $(node -v | cut -d. -f1 | tr -d 'v') -lt 20 ]]; then
    curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
    sudo apt install -y nodejs
fi
echo "Node version: $(node -v)"
echo "npm version: $(npm -v)"

# --- 3. Copy project & Build ---
echo ""
echo "[3/7] Setting up project and building..."
sudo mkdir -p "$REPO_DIR"
sudo mkdir -p "$APP_DIR"

# Copy current directory to server source
sudo cp -r . "$REPO_DIR/"
sudo chown -R $(whoami):$(whoami) "$REPO_DIR"
cd "$REPO_DIR"

npm install
npm run build

# Copy built files to web root
sudo cp -r dist/* "$APP_DIR/"
sudo chown -R www-data:www-data "$APP_DIR"

# --- 4. Configure Firewall ---
echo ""
echo "[4/7] Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
sudo ufw --force enable

# --- 5. Configure Nginx (HTTP first for Let's Encrypt) ---
echo ""
echo "[5/7] Configuring Nginx..."

sudo tee /etc/nginx/sites-available/unicornx > /dev/null <<'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name unicornx.fun;

    root /var/www/unicornx;
    index index.html;

    # SPA - all routes go to index.html
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # Security headers
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;

    # Gzip
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml text/javascript image/svg+xml;
}
NGINX

# Enable site, disable default
sudo ln -sf /etc/nginx/sites-available/unicornx /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default

# Test and restart nginx
sudo nginx -t
sudo systemctl restart nginx
sudo systemctl enable nginx

# --- 6. SSL Certificate (Let's Encrypt) ---
echo ""
echo "[6/7] Obtaining SSL certificate..."
sudo certbot --nginx -d "$DOMAIN" --non-interactive --agree-tos --email "$EMAIL" --redirect

# --- 7. Auto-renew cron ---
echo ""
echo "[7/7] Setting up auto-renewal..."
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

echo ""
echo "========================================="
echo "  Deployment Complete!"
echo "========================================="
echo ""
echo "  Site: https://$DOMAIN"
echo "  SSL:  Let's Encrypt (auto-renew)"
echo "  Root: $APP_DIR"
echo ""
echo "  Useful commands:"
echo "    sudo nginx -t              # Test config"
echo "    sudo systemctl restart nginx  # Restart"
echo "    sudo certbot renew --dry-run  # Test renewal"
echo ""
echo "========================================="
