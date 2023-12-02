import EnterpriseMiniature from "./EnterpriseMiniature";
import { useState } from "react";
import { useEffect } from "react";
import { getAllEnterprises } from "./Web3/EnterpriseRegistration";

export default function Enterprises({onEnterpriseClicked}) {
  const [isLoading, setIsLoading] = useState(true);

  const [enterprises, setEnterprises] = useState([]);

  function getEnterprises() {
    getAllEnterprises().then(function (result) {
      //result es un array de empresas
      /*return a Enterprise miniature with the first element of the array*/
      //console.log(result);
      //console.log(result[0]);
      //return result[0];
      let enterpriseList = [];
      //return <EnterpriseMiniature enterprise={result[0]} />
      for (let i = 0; i < result.length; i++) {
        enterpriseList.push(result[i]);
        //console.log(result[i].name);
        //<EnterpriseMiniature enterprise={result[i]} />
      }
      setEnterprises(enterpriseList);
      setIsLoading(false);
    });
  }

  useEffect(() => {
    getEnterprises();
  }, [enterprises]);

  return (
    <>
      {!isLoading && (
        <>
          <div className="documents-content">
            <div className="section-title">
              <h1 className="section-title-text">
                <span className="section-title-span">Enterprises</span>
              </h1>
            </div>
            <div className="enterprise-section-list">
              {enterprises.map((enterprise) => {
                return (
                  <EnterpriseMiniature
                    key={enterprise.wallet}
                    enterprise={enterprise}
                    onEnterpriseClicked={onEnterpriseClicked}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
}
