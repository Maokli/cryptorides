import sys
import subprocess
from scripts.utils import read_ports_id,save_ports_id

def stop_container(container_id):
    used_ports=read_ports_id()
    try:
        P = subprocess.Popen(f"docker stop {container_id}", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        deleted_container, stderr = P.communicate()
        if P.returncode==0:
            used_ports.pop(container_id)
            save_ports_id(used_ports)
            print("container have been stopped  successfully")
            return True
        else:
            print(f"container with id {container_id} had an error while stopping it !")
    except:
        print("An exception have occured")
    return False
if __name__=="__main__":
    args = sys.argv
    stop_container(args[1])