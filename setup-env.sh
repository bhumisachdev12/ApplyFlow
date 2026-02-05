#!/bin/bash

echo "🎛️ ApplyFlow Feature Toggle"
echo "==========================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

# Function to toggle feature in env file
toggle_feature() {
    local file=$1
    local feature=$2
    local current_value=$3
    
    if [ "$current_value" = "true" ]; then
        new_value="false"
    else
        new_value="true"
    fi
    
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        sed -i '' "s/${feature}=.*/${feature}=${new_value}/" "$file"
    else
        # Linux
        sed -i "s/${feature}=.*/${feature}=${new_value}/" "$file"
    fi
    
    print_status "Toggled $feature to $new_value in $file"
}

# Function to get current feature value
get_feature_value() {
    local file=$1
    local feature=$2
    
    if [ -f "$file" ]; then
        grep "^${feature}=" "$file" | cut -d'=' -f2
    else
        echo "false"
    fi
}

# Function to show current status
show_status() {
    echo ""
    print_info "Current Feature Status:"
    echo ""
    
    # Server features
    echo "Server Features:"
    echo "  Analytics: $(get_feature_value 'server/.env' 'ENABLE_ANALYTICS')"
    echo "  Swagger: $(get_feature_value 'server/.env' 'ENABLE_SWAGGER')"
    echo "  Debug Logs: $(get_feature_value 'server/.env' 'ENABLE_DEBUG_LOGS')"
    echo ""
    
    # Client features
    echo "Client Features:"
    echo "  Analytics: $(get_feature_value 'client/.env' 'VITE_ENABLE_ANALYTICS')"
    echo "  Dark Mode: $(get_feature_value 'client/.env' 'VITE_ENABLE_DARK_MODE')"
    echo "  Notifications: $(get_feature_value 'client/.env' 'VITE_ENABLE_NOTIFICATIONS')"
    echo "  Drag & Drop: $(get_feature_value 'client/.env' 'VITE_ENABLE_DRAG_DROP')"
    echo "  Debug: $(get_feature_value 'client/.env' 'VITE_DEBUG')"
}

# Main menu
echo ""
echo "Select action:"
echo "1) Show current status"
echo "2) Toggle server analytics"
echo "3) Toggle server swagger"
echo "4) Toggle server debug logs"
echo "5) Toggle client analytics"
echo "6) Toggle client dark mode"
echo "7) Toggle client notifications"
echo "8) Toggle client drag & drop"
echo "9) Toggle client debug"
echo "10) Enable all features"
echo "11) Disable all features"
echo ""

read -p "Enter your choice (1-11): " choice

case $choice in
    1)
        show_status
        ;;
    2)
        current=$(get_feature_value 'server/.env' 'ENABLE_ANALYTICS')
        toggle_feature 'server/.env' 'ENABLE_ANALYTICS' "$current"
        ;;
    3)
        current=$(get_feature_value 'server/.env' 'ENABLE_SWAGGER')
        toggle_feature 'server/.env' 'ENABLE_SWAGGER' "$current"
        ;;
    4)
        current=$(get_feature_value 'server/.env' 'ENABLE_DEBUG_LOGS')
        toggle_feature 'server/.env' 'ENABLE_DEBUG_LOGS' "$current"
        ;;
    5)
        current=$(get_feature_value 'client/.env' 'VITE_ENABLE_ANALYTICS')
        toggle_feature 'client/.env' 'VITE_ENABLE_ANALYTICS' "$current"
        ;;
    6)
        current=$(get_feature_value 'client/.env' 'VITE_ENABLE_DARK_MODE')
        toggle_feature 'client/.env' 'VITE_ENABLE_DARK_MODE' "$current"
        ;;
    7)
        current=$(get_feature_value 'client/.env' 'VITE_ENABLE_NOTIFICATIONS')
        toggle_feature 'client/.env' 'VITE_ENABLE_NOTIFICATIONS' "$current"
        ;;
    8)
        current=$(get_feature_value 'client/.env' 'VITE_ENABLE_DRAG_DROP')
        toggle_feature 'client/.env' 'VITE_ENABLE_DRAG_DROP' "$current"
        ;;
    9)
        current=$(get_feature_value 'client/.env' 'VITE_DEBUG')
        toggle_feature 'client/.env' 'VITE_DEBUG' "$current"
        ;;
    10)
        print_info "Enabling all features..."
        # Server
        toggle_feature 'server/.env' 'ENABLE_ANALYTICS' 'false'
        toggle_feature 'server/.env' 'ENABLE_SWAGGER' 'false'
        toggle_feature 'server/.env' 'ENABLE_DEBUG_LOGS' 'false'
        # Client
        toggle_feature 'client/.env' 'VITE_ENABLE_ANALYTICS' 'false'
        toggle_feature 'client/.env' 'VITE_ENABLE_DARK_MODE' 'false'
        toggle_feature 'client/.env' 'VITE_ENABLE_NOTIFICATIONS' 'false'
        toggle_feature 'client/.env' 'VITE_ENABLE_DRAG_DROP' 'false'
        toggle_feature 'client/.env' 'VITE_DEBUG' 'false'
        ;;
    11)
        print_info "Disabling all features..."
        # Server
        toggle_feature 'server/.env' 'ENABLE_ANALYTICS' 'true'
        toggle_feature 'server/.env' 'ENABLE_SWAGGER' 'true'
        toggle_feature 'server/.env' 'ENABLE_DEBUG_LOGS' 'true'
        # Client
        toggle_feature 'client/.env' 'VITE_ENABLE_ANALYTICS' 'true'
        toggle_feature 'client/.env' 'VITE_ENABLE_DARK_MODE' 'true'
        toggle_feature 'client/.env' 'VITE_ENABLE_NOTIFICATIONS' 'true'
        toggle_feature 'client/.env' 'VITE_ENABLE_DRAG_DROP' 'true'
        toggle_feature 'client/.env' 'VITE_DEBUG' 'true'
        ;;
    *)
        echo "Invalid choice"
        exit 1
        ;;
esac

echo ""
print_info "Restart the development servers to apply changes:"
echo "npm run dev"