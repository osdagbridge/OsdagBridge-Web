import sys
import importlib.abc
import importlib.machinery
from unittest.mock import MagicMock

PREFIXES = ("osdagbridge.desktop", "PySide6", "shiboken6")


class MockFinder(importlib.abc.MetaPathFinder, importlib.abc.Loader):
    def find_spec(self, fullname, path, target=None):
        # Any module whose name starts with a listed prefix is handled by MagicMock
        if fullname.startswith(PREFIXES):
            return importlib.machinery.ModuleSpec(fullname, self, is_package=True)
        return None  # everything else imports normally

    def create_module(self, spec):
        mock = MagicMock(name=spec.name)
        mock.__path__ = []   # marks it as a package, so submodule imports work
        return mock

    def exec_module(self, module):
        pass  # nothing to run



if not any(isinstance(f, MockFinder) for f in sys.meta_path):
    sys.meta_path.insert(0, MockFinder())