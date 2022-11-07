import os


def is_nc(entry):
    return os.path.splitext(entry)[1] == ".nc"


def get_nc_files(root, recursive=False):
    """Returns a list of all the .nc files in a directory"""
    nc_files = []
    if recursive:
        for dirpath, dirnames, filenames in os.walk(root):
            for file in filenames:
                if is_nc(file):
                    nc_files.append(os.path.join(dirpath, file))
        return nc_files
    for entry in os.listdir(root):
        if is_nc(entry):
            nc_files.append(os.path.join(root, entry))
    return nc_files
