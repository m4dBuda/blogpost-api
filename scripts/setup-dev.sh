set -e

NODE_VERSION="22.14.0"

echo "Loading NVM..."
export NVM_DIR="$HOME/.nvm"
if [ -s "$NVM_DIR/nvm.sh" ]; then
  # Load NVM if it is installed
  . "$NVM_DIR/nvm.sh"
elif [ -s "/usr/local/opt/nvm/nvm.sh" ]; then
  # macOS with Homebrew
  . "/usr/local/opt/nvm/nvm.sh"
else
  echo "NVM is not installed. Please install NVM before running this script."
  exit 1
fi

echo "Using NVM to configure Node.js version $NODE_VERSION..."
nvm install $NODE_VERSION
nvm use $NODE_VERSION

echo "Installing project dependencies..."
npm install

echo "Starting the database container with Docker..."
if command -v docker &> /dev/null; then
  docker-compose up -d
else
  echo "Docker is not installed. Please install Docker before running this script."
  exit 1
fi

echo "Waiting for the database to start..."
sleep 5

echo "Running database migrations..."
npx prisma migrate deploy
sleep 10

# Check if the application is already running on port 3000
echo "Checking if port 3000 is in use..."
if lsof -i :3000 &> /dev/null; then
  echo "Port 3000 is already in use. Stopping the existing process..."
  PID=$(lsof -t -i :3000)
  kill -9 $PID
  echo "Process $PID stopped."
fi

echo "Starting the application..."
npm run start:dev &

echo "Waiting for the application to start..."
sleep 5 

echo "Calling the GET endpoint..."
curl -X GET http://localhost:3000/api/v1/health

echo "Setup completed successfully!"