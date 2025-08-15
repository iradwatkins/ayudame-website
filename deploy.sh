#!/bin/bash

# Ayudame.com.do Deployment Script
# Deploys to separate VPS instance

set -e

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${GREEN}================================================${NC}"
echo -e "${GREEN}     AYÚDAME.COM.DO DEPLOYMENT SCRIPT          ${NC}"
echo -e "${GREEN}================================================${NC}"

# Configuration - Update these with your VPS details
VPS_HOST="YOUR_VPS_IP_HERE"  # Replace with actual VPS IP
VPS_USER="root"
VPS_PASS="YOUR_VPS_PASSWORD"  # Replace with actual password
DOMAIN="ayudame.com.do"

echo -e "\n${YELLOW}📦 Creating deployment package...${NC}"

# Create temporary deployment directory
TEMP_DIR="/tmp/ayudame-deploy-$(date +%s)"
mkdir -p $TEMP_DIR

# Copy website files
cp -r index.html css js images $TEMP_DIR/

# Create tar archive
cd /tmp
tar czf ayudame-deploy.tar.gz $(basename $TEMP_DIR)

echo -e "${GREEN}✅ Package created${NC}"

echo -e "\n${YELLOW}📤 Uploading to VPS...${NC}"

# Upload to VPS
sshpass -p "$VPS_PASS" scp ayudame-deploy.tar.gz $VPS_USER@$VPS_HOST:/tmp/

echo -e "${GREEN}✅ Upload complete${NC}"

echo -e "\n${YELLOW}🚀 Deploying on VPS...${NC}"

# Deploy on VPS
sshpass -p "$VPS_PASS" ssh $VPS_USER@$VPS_HOST << 'EOF'
# Install nginx if not present
if ! command -v nginx &> /dev/null; then
    echo "Installing nginx..."
    apt-get update
    apt-get install -y nginx certbot python3-certbot-nginx
fi

# Create website directory
mkdir -p /var/www/ayudame.com.do

# Extract and deploy files
cd /tmp
tar xzf ayudame-deploy.tar.gz
cp -r ayudame-deploy-*/* /var/www/ayudame.com.do/

# Set permissions
chown -R www-data:www-data /var/www/ayudame.com.do
chmod -R 755 /var/www/ayudame.com.do

# Create nginx configuration
cat > /etc/nginx/sites-available/ayudame.com.do << 'NGINX'
server {
    listen 80;
    listen [::]:80;
    server_name ayudame.com.do www.ayudame.com.do;
    
    root /var/www/ayudame.com.do;
    index index.html;
    
    location / {
        try_files $uri $uri/ =404;
    }
    
    # Cache static assets
    location ~* \.(css|js|jpg|jpeg|png|gif|ico|svg|woff|woff2)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }
    
    # Security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
}
NGINX

# Enable site
ln -sf /etc/nginx/sites-available/ayudame.com.do /etc/nginx/sites-enabled/

# Test nginx configuration
nginx -t

# Reload nginx
systemctl reload nginx

# Clean up
rm -rf /tmp/ayudame-deploy*

echo "✅ Website deployed successfully!"
echo "🌐 Visit: http://ayudame.com.do"
EOF

echo -e "\n${GREEN}================================================${NC}"
echo -e "${GREEN}✅ DEPLOYMENT COMPLETE!${NC}"
echo -e "${GREEN}================================================${NC}"
echo -e "\nYour website is now live at:"
echo -e "  🌐 http://${DOMAIN}"
echo -e "\nNext steps:"
echo -e "  1. Update DNS records to point to: ${VPS_HOST}"
echo -e "  2. Run SSL certificate setup:"
echo -e "     ${YELLOW}certbot --nginx -d ${DOMAIN} -d www.${DOMAIN}${NC}"
echo -e "\n${GREEN}Thank you for using Ayúdame deployment script!${NC}"

# Clean up local temp files
rm -rf $TEMP_DIR
rm -f /tmp/ayudame-deploy.tar.gz