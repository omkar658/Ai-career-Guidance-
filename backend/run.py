#!/usr/bin/env python3
"""
Run script for AI Career Guidance Platform Backend
"""

import os
import sys
import subprocess

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("Python 3.8 or higher is required")
        sys.exit(1)
    print(f"Python {sys.version.split()[0]} detected")

def check_dependencies():
    """Check if required dependencies are installed"""
    try:
        import fastapi
        import uvicorn
        import supabase
        import openai
        import pydantic
        print("All dependencies are installed")
        return True
    except ImportError as e:
        print(f"Missing dependency: {e}")
        print("Run: pip install -r requirements.txt")
        return False

def check_environment():
    """Check if environment variables are configured"""
    required_vars = [
        'SUPABASE_URL',
        'SUPABASE_KEY'
    ]

    missing_vars = []
    for var in required_vars:
        if not os.getenv(var):
            missing_vars.append(var)

    if missing_vars:
        print("WARNING: Missing environment variables:")
        for var in missing_vars:
            print(f"   - {var}")
        print("\nThe application will start but some features may not work.")
        print("Configure your environment variables in the .env file.")
        # Don't return False - let the app start with warnings

    print("Environment variables configured")
    return True

def start_server():
    """Start the FastAPI server"""
    print("Starting AI Career Guidance Platform Backend...")
    print("API Documentation: http://localhost:8000/docs")
    print("Health Check: http://localhost:8000/health")
    print("\nPress Ctrl+C to stop the server\n")

    try:
        # Run the server
        subprocess.run([
            sys.executable, "-m", "app.main"
        ], check=True)
    except KeyboardInterrupt:
        print("\nServer stopped by user")
    except subprocess.CalledProcessError as e:
        print(f"Server failed to start: {e}")
        sys.exit(1)

def main():
    """Main function"""
    print("AI Career Guidance Platform - Backend")
    print("=" * 50)

    # Run checks
    check_python_version()

    if not check_dependencies():
        sys.exit(1)

    if not check_environment():
        sys.exit(1)

    # Start server
    start_server()

if __name__ == "__main__":
    main()