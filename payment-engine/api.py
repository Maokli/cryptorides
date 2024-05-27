from flask import Flask, jsonify, request
from scripts.create_container import create_instance
from scripts.stop_container import stop_container
from scripts.secrets import getsecrets
from scripts.utils import conversion

app = Flask(__name__)


@app.route('/rent', methods=['POST'])
def get_incomes():
    secret=request.get_json()["secret"]
    print(secret)
    if secret!=getsecrets():
        return jsonify({"result":"Only admin can access this !"})
    
    renter=request.get_json()["renter"]
    owner=request.get_json()["owner"]
    renalDuration=int(request.get_json()["rentalPeriod"]) * 3600 * 24
    rentalPeriod=str(renalDuration)
    downPaymentAmount=conversion(request.get_json()["downPaymentAmount"])
    floatRentValue = float(conversion(request.get_json()["rentAmount"])) * float(request.get_json()["rentalPeriod"])
    rentAmount= str(floatRentValue)
    print(rentAmount)

    docker=create_instance(renter,owner,rentalPeriod,downPaymentAmount,rentAmount)

    return jsonify(docker)

if __name__ == '__main__':
    app.run(debug=True)