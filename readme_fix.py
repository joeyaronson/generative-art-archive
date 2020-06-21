import os

filenames = os.listdir(".")

for folder in filenames:
    folder_path = "./%s" % folder
    if os.path.isdir(folder_path) and folder[0] != ".":
        readme = "%s/README.md" % folder_path
        rfile = open(readme, "r")
        data = rfile.readlines()
        img_line = data.pop(len(data) - 1)
        fixed_img_line = img_line.replace("png", "PNG")
        data.append("\n")
        data.append("\n")
        data.append(fixed_img_line)
        rfile.close()
        with open(readme, "w") as file:
            file.writelines(data)
