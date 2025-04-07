set -e

echo "Stopping the application..."

# Check if the application is running on port 3000
if lsof -i :3000 &> /dev/null; then
  PID=$(lsof -t -i :3000)
  echo "Stopping process running on port 3000 (PID: $PID)..."
  kill -9 $PID
  echo "Process $PID stopped."
else
  echo "No application is running on port 3000."
fi

echo "Stopping Docker containers..."
if command -v docker &> /dev/null; then
  docker-compose down
  echo "Docker containers stopped."
else
  echo "Docker is not installed or not running. Skipping container shutdown."
fi

echo "Teardown completed successfully!"