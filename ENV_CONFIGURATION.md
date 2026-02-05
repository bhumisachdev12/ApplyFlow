# ApplyFlow Environment Configuration Guide

## 📁 Environment Files Overview

### Server Environment Files
- `.env` - Development configuration (active)
- `.env.example` - Template for new developers
- `.env.production` - Production deployment settings
- `.env.test` - Testing environment settings

### Client Environment Files
- `.env` - Development configuration (active)
- `.env.example` - Template for new developers
- `.env.production` - Production build settings
- `.env.test` - Testing environment settings

## 🔧 Server Configuration Variables

### Core Server Settings
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `PORT` | Server port number | 5000 | ✅ |
| `NODE_ENV` | Environment mode | development | ✅ |
| `API_VERSION` | API version prefix | v1 | ✅ |

### Database Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | mongodb://localhost:27017/applyflow | ✅ |
| `MONGODB_TEST_URI` | Test database URI | mongodb://localhost:27017/applyflow_test | ❌ |
| `DB_CONNECTION_TIMEOUT` | Connection timeout (ms) | 30000 | ❌ |
| `DB_MAX_POOL_SIZE` | Max connection pool size | 10 | ❌ |

### Authentication & Security
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `JWT_SECRET` | JWT signing secret | your-secret-key | ✅ |
| `JWT_EXPIRES_IN` | JWT expiration time | 7d | ✅ |
| `JWT_REFRESH_EXPIRES_IN` | Refresh token expiration | 30d | ❌ |
| `BCRYPT_SALT_ROUNDS` | Password hashing rounds | 12 | ❌ |

### CORS Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `CORS_ORIGIN` | Allowed origins (comma-separated) | http://localhost:3000 | ✅ |
| `CORS_CREDENTIALS` | Allow credentials | true | ❌ |

### Rate Limiting
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `RATE_LIMIT_WINDOW_MS` | Rate limit window (ms) | 900000 | ❌ |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | 100 | ❌ |

### Email Configuration (Future Feature)
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `SMTP_HOST` | SMTP server host | smtp.gmail.com | ❌ |
| `SMTP_PORT` | SMTP server port | 587 | ❌ |
| `SMTP_USER` | SMTP username | your-email@gmail.com | ❌ |
| `SMTP_PASS` | SMTP password/API key | your-app-password | ❌ |

### Feature Flags
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `ENABLE_ANALYTICS` | Enable analytics endpoints | true | ❌ |
| `ENABLE_EMAIL_NOTIFICATIONS` | Enable email features | false | ❌ |
| `ENABLE_FILE_UPLOADS` | Enable file upload features | false | ❌ |
| `ENABLE_SWAGGER` | Enable API documentation | true | ❌ |

## 🎨 Client Configuration Variables

### API Configuration
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_API_URL` | Backend API base URL | http://localhost:5000/api | ✅ |
| `VITE_API_TIMEOUT` | API request timeout (ms) | 30000 | ❌ |
| `VITE_API_RETRY_ATTEMPTS` | API retry attempts | 3 | ❌ |

### Application Settings
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_APP_NAME` | Application name | ApplyFlow | ❌ |
| `VITE_APP_VERSION` | Application version | 1.0.0 | ❌ |
| `VITE_DEBUG` | Enable debug mode | true | ❌ |

### Authentication
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_JWT_STORAGE_KEY` | JWT localStorage key | applyflow_token | ❌ |
| `VITE_USER_STORAGE_KEY` | User data localStorage key | applyflow_user | ❌ |
| `VITE_TOKEN_REFRESH_THRESHOLD` | Token refresh threshold (ms) | 300000 | ❌ |

### UI Configuration
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_THEME` | Default theme | light | ❌ |
| `VITE_DEFAULT_LANGUAGE` | Default language | en | ❌ |
| `VITE_ITEMS_PER_PAGE` | Pagination size | 10 | ❌ |

### Feature Flags
| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `VITE_ENABLE_ANALYTICS` | Enable analytics features | true | ❌ |
| `VITE_ENABLE_NOTIFICATIONS` | Enable notifications | true | ❌ |
| `VITE_ENABLE_DARK_MODE` | Enable dark mode toggle | true | ❌ |
| `VITE_ENABLE_DRAG_DROP` | Enable drag & drop | true | ❌ |

### External Services
| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `VITE_GOOGLE_ANALYTICS_ID` | Google Analytics ID | G-XXXXXXXXXX | ❌ |
| `VITE_SENTRY_DSN` | Sentry error tracking DSN | https://...@sentry.io/... | ❌ |

## 🚀 Environment Setup Instructions

### 1. Development Setup
```bash
# Copy example files
cp server/.env.example server/.env
cp client/.env.example client/.env

# Edit the files with your local settings
nano server/.env
nano client/.env
```

### 2. Production Setup
```bash
# Use production templates
cp server/.env.production server/.env
cp client/.env.production client/.env

# Update with production values
# - Change JWT_SECRET to a secure 256-bit key
# - Update MONGODB_URI to MongoDB Atlas
# - Set CORS_ORIGIN to your domain
# - Configure external service keys
```

### 3. Testing Setup
```bash
# Use test templates
cp server/.env.test server/.env
cp client/.env.test client/.env

# Ensure test database is separate
# - Use different database name
# - Use different port for server
# - Disable external services
```

## 🔒 Security Best Practices

### JWT Secret Generation
```bash
# Generate a secure JWT secret
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Environment Variable Security
- ✅ Never commit `.env` files to version control
- ✅ Use different secrets for each environment
- ✅ Rotate secrets regularly in production
- ✅ Use environment-specific database URIs
- ✅ Limit CORS origins in production

### Production Checklist
- [ ] JWT_SECRET is 256-bit random key
- [ ] MONGODB_URI uses MongoDB Atlas with authentication
- [ ] CORS_ORIGIN is set to your domain only
- [ ] Debug flags are disabled
- [ ] Rate limiting is configured appropriately
- [ ] HTTPS is enforced
- [ ] Monitoring services are configured

## 📊 Environment Validation

The application includes built-in environment validation:

### Server Validation
- Checks required environment variables on startup
- Validates JWT secret length and complexity
- Verifies database connection
- Confirms CORS configuration

### Client Validation
- Validates API URL format
- Checks feature flag consistency
- Verifies external service configurations

## 🔄 Environment Switching

### Using Different Environments
```bash
# Development (default)
npm run dev

# Production build
npm run build
NODE_ENV=production npm start

# Testing
npm run test
```

### Docker Environment
```dockerfile
# Use environment-specific files
COPY .env.production .env
```

## 📝 Adding New Environment Variables

1. **Add to all environment files** (`.env`, `.env.example`, etc.)
2. **Update this documentation**
3. **Add validation** in application startup
4. **Update deployment scripts** if needed
5. **Test in all environments**

---

*Keep your environment variables secure and never expose sensitive data in client-side code!*