import documentimage from "../static/images/document-image.png";

export default function DocumentsMiniature({ document, onClicked }) {
  
  function handleDocumentClick() {

    if (onClicked)
    {
      console.log("document", document);
      onClicked(document);
    }
}

function dotColor(document) {

  if (document.sent === true) {

    if (document.downloaded === true) {

      if(document.confirmed === true) {
        return "dotConfirmed";
      }
      if(document.rejected === true) {
        return "dotRejected";
      }

      return "dotDownloaded";
    }

    return "dot";
    
  } else {
    return "nada";
  }
}
  
  return (
    <div className="documents-section-list-item" onClick={() => handleDocumentClick()}>
      <div className="documents-section-list-item-image">
        <img className="documents-section-list-item-image-logo" alt="logo" src={documentimage}/>
      </div>
      <div className="documents-section-list-item-info">
        <div className="documents-section-list-item-info-title">
        <span className={dotColor(document)}></span>
          <span className="documents-section-list-item-info-title-text">
            {document.subject}
          </span>
        </div>
      </div>
    </div>
  );
}
