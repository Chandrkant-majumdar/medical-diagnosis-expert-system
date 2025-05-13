import sys
import importlib

# Remove any cached versions of our modules
for module in list(sys.modules.keys()):
    if module.startswith('modules.') or module == 'modules':
        del sys.modules[module]
        print(f"Removed cached module: {module}")

print("Cache cleared. You can now run your application.")
