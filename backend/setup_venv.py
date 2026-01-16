#!/usr/bin/env python3
"""
Virtual Environment Setup Script for AI Career Guidance Platform
"""

import os
import sys
import subprocess
import platform

def run_command(command, description):
    """Run a command and return success status"""
    print(f"\n[*] {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"[+] {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"[-] {description} failed:")
        print(e.stderr)
        return False

def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("[-] Python 3.8 or higher is required")
        print(f"    Current version: {sys.version}")
        return False

    print(f"[+] Python {sys.version.split()[0]} detected")
    return True

def create_virtual_environment():
    """Create Python virtual environment"""
    if os.path.exists('venv'):
        print("[!] Virtual environment already exists")
        return True

    return run_command("python -m venv venv", "Creating virtual environment")

def activate_virtual_environment():
    """Activate virtual environment and install dependencies"""
    # Determine activation command based on OS
    if platform.system() == "Windows":
        activate_cmd = "venv\\Scripts\\activate"
    else:
        activate_cmd = "source venv/bin/activate"

    # Install requirements
    pip_cmd = f"{activate_cmd} && pip install --upgrade pip && pip install -r requirements.txt"
    return run_command(pip_cmd, "Installing Python dependencies")

def create_env_file():
    """Create .env file if it doesn't exist"""
    if os.path.exists('.env'):
        print("[!] .env file already exists")
        return True

    try:
        # Copy from template if it exists
        if os.path.exists('.env.template'):
            with open('.env.template', 'r') as template:
                content = template.read()
            with open('.env', 'w') as env_file:
                env_file.write(content)
            print("[+] Created .env file from template")
            print("[!] Please update the .env file with your actual API keys!")
            return True
        else:
            print("[!] .env.template not found. Please create .env file manually.")
            print("    See ENV_SETUP.md for instructions.")
            return False
    except Exception as e:
        print(f"[-] Failed to create .env file: {e}")
        return False

def test_setup():
    """Test if setup is working"""
    print("\n[*] Testing setup...")

    try:
        # Try to import key modules
        import fastapi
        import uvicorn
        import supabase
        import openai
        print("[+] All required modules can be imported")
        return True
    except ImportError as e:
        print(f"[-] Import test failed: {e}")
        print("    Try running the setup again")
        return False

def main():
    """Main setup function"""
    print("AI Career Guidance Platform - Environment Setup")
    print("=" * 60)

    # Change to script directory
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    success_count = 0
    total_steps = 5

    # Step 1: Check Python version
    if check_python_version():
        success_count += 1

    # Step 2: Create virtual environment
    if create_virtual_environment():
        success_count += 1

    # Step 3: Install dependencies
    if activate_virtual_environment():
        success_count += 1

    # Step 4: Create environment file
    if create_env_file():
        success_count += 1

    # Step 5: Test setup
    if test_setup():
        success_count += 1

    # Summary
    print(f"\n{'='*60}")
    if success_count == total_steps:
        print("[SUCCESS] Setup completed successfully!")
        print("\nNext steps:")
        print("1. Edit the .env file with your actual API keys")
        print("2. Run the application: python run.py")
        print("3. Visit http://localhost:8000/docs for API documentation")
    else:
        print(f"[WARNING] Setup completed with {success_count}/{total_steps} successful steps")
        print("Check the errors above and try running the setup again")
        print("For manual setup instructions, see ENV_SETUP.md")

    return success_count == total_steps

if __name__ == "__main__":
    success = main()
    sys.exit(0 if success else 1)