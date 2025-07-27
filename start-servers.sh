#!/bin/bash

echo "🚀 Starting Portfolio Website Servers..."

# Function to cleanup background processes on exit
cleanup() {
    echo "🛑 Stopping servers..."
    pkill -f "python app.py"
    pkill -f "npm run dev"
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start backend server
echo "🔧 Starting Flask Backend Server..."
source venv/bin/activate
python app.py &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "⚛️  Starting React Frontend Server..."
npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Both servers are now running!"
echo ""
echo "🌐 Frontend (React): http://localhost:5173"
echo "🔧 Backend (Flask):  http://localhost:5000"
echo ""
echo "📱 Open your browser and visit: http://localhost:5173"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID 