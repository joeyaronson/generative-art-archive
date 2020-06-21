import sys
import os


def generate_folder():
    folder_name = sys.argv[1]
    link = sys.argv[2]
    path = (
        "C:\\Users\\arons\\OneDrive\\Projects\\generative-art-archive\\%s" % folder_name
    )
    if not os.path.exists(path):
        os.makedirs(path)
    os.chdir(path)
    f = open("%s.js" % folder_name, "w+")
    f.write("PUT CODE HERE")
    f.close()

    f = open("README.md", "w+")
    f.write("# %s\n" % folder_name)
    f.write("live view [here](%s)\n" % link)
    f.write("![%s](thumbnail.png)\n" % folder_name)


generate_folder()
