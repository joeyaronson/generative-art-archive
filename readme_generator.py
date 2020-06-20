import os

filenames= os.listdir (".")
data = []
for folder in filenames :
    print(folder)
    folder_path = "./%s" % folder
    if os.path.isdir(folder_path) and folder[0] != ".":
        readme = "%s/README.md" %folder_path
        dir_contents = os.listdir (folder_path)
        html_line = """<img src="{folder}/thumbnail.PNG" alt="{folder}" style="width:200px;"/>
                    """.format(folder=folder)
        data.append(html_line)



with open("newREADME.md",'w') as file:
    file.writelines(data)

