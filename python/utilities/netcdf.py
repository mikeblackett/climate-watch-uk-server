import os
import xarray as xr


def list_files(directory, recursive=False, path=False):
    """Returns a list of all the .nc files in a directory"""
    assert os.path.isdir(directory)
    nc_files = []
    for dirpath, dirnames, filenames in os.walk(directory):
        if not recursive:
            dirnames.clear()
        for file in filenames:
            if os.path.splitext(file)[1] == ".nc":
                if path:
                    nc_files.append(os.path.join(dirpath, file))
                else:
                    nc_files.append(file)
    return nc_files


names = {
    "groundfrost": "Frost",
    "sun": "Sun",
    "tas": "Temperature",
    "snowLying": "Snow",
    "tasmax": "Maximum temperature",
    "hurs": "Humidity",
    "rainfall": "Rain",
    "sfcWind": "Wind",
    "tasmin": "Minimum temperature",
}


def get_attributes(data_array, to_drop=None):
    """
    Returns a dict describing the attributes of a DataArray
    Optionally, filters the attributes with to_drop
    """
    assert isinstance(to_drop, list) or to_drop is None
    assert isinstance(data_array, xr.DataArray)
    attrs_dict = {}
    for key, value in data_array.attrs.items():
        if key not in to_drop:
            attrs_dict[key] = value
    attrs_dict["code"] = data_array.name
    attrs_dict["name"] = names[attrs_dict["code"]]
    return attrs_dict
