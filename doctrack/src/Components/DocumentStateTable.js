import { useState } from "react";
import { useEffect } from "react";
import { getEnterprise } from "./Web3/EnterpriseRegistration";
import { getUser } from "./Web3/UserRegistration";

export default function DocumentStateTable({ file }) {

    const [enterpriseName, setEnterpriseName] = useState('');
    const [userName, setUserName] = useState('');
    const [userSurname, setUserSurname] = useState('');
    const [departmentName, setDeparmentName] = useState('');
    const [sharedWithText, setSharedWithText] = useState('');



    function getEnterpriseName(wallet) {
        getEnterprise(wallet).then(function (result) {
            setEnterpriseName(result.name);
        }
        );
    }

    function getUserName(wallet) {
        getUser(wallet).then(function (result) {
            setUserName(result.name);
            setUserSurname(result.surname);
            console.log(result);
        }
        );
    }

    useEffect(() => {
        getEnterpriseName(file.enterprise);
        getUserName(file.user);
        checkifDownloaded(enterpriseName);

    }, [file.downloaded, file.confirmed, file.rejected, file.user, file.enterprise, enterpriseName]);


    function checkifDownloaded(enterpriseName) {
        let myTable = document.getElementById("stateTable");
        if(enterpriseName === ""){
            return;
        }
        if (file.downloaded) {
            var row = myTable.insertRow(myTable.rows.length);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);

            cell1.innerHTML = "Downloaded";
            cell2.innerHTML = enterpriseName;
            //aqui ira reenviado a departamento
            if(file.confirmed){
                var row2 = myTable.insertRow(myTable.rows.length);
                var cell12 = row2.insertCell(0);
                var cell22 = row2.insertCell(1);

                cell12.innerHTML = "Confirmed";
                cell22.innerHTML = enterpriseName;
            }
            if(file.rejected){
                var row3 = myTable.insertRow(myTable.rows.length);
                var cell13 = row3.insertCell(0);
                var cell23 = row3.insertCell(1);

                cell13.innerHTML = "Rejected";
                cell23.innerHTML = enterpriseName;
            }
        } else {
            return "Not Downloaded";
        }
    }

    return (
        <div className="document-detailed-content-state">
            <table className="document-detailed-content-state-table" id="stateTable">
                <tr className="document-detailed-content-state-table-row">
                    <th className="document-detailed-content-state-table-column"> State </th>
                    <th className="document-detailed-content-state-table-column"> By </th>
                </tr>
                <tr className="document-detailed-content-state-table-row">
                    <td className="document-detailed-content-state-table-column"> Sent </td>
                    <td className="document-detailed-content-state-table-column"> {userName} {userSurname} </td>
                </tr>
            </table>

        </div>
    );
}