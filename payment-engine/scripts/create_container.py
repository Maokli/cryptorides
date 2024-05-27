import subprocess
from scripts.utils import get_random_port,save_ports_id,read_ports_id
from scripts.stop_container import stop_container


used_port=read_ports_id()

def create_instance(renter,owner,rentalPeriod,downPaymentAmount,rentAmount):
    port = get_random_port(used_port)
    try:
        P = subprocess.Popen(f"docker run -d --network payment-network -p {port}:3000 -e RENTER_ADDRESS={renter} -e OWNER_ADDRESS={owner} -e RENTAL_PERIOD={rentalPeriod} -e DOWN_PAYMENT_AMOUNT={downPaymentAmount} -e RENT_AMOUNT={rentAmount} payment-instance", shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        container_id, stderr = P.communicate()
        print(stderr.decode())
        if P.returncode == 0:
            return True
        else:
            if container_id.strip():
                stop_container(container_id)
            return False
    except:
        return False
    
if __name__=="__main__":
    print(create_instance())
