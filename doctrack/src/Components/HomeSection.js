const HomeSectionL = ({title, description, src, id}) => {
    return (
        <div className="sectionLeft" id={id}>
            <div className="sectionLeftImage">
                <img className="leftImage" src={src}/>
                </div>
            <div className="sectionLeftText">
                <h1 className="sectionLeftTextTitle">{title}</h1>
                    <span className="sectionLeftTextTitleSpan"></span>
                <p className="sectionLeftTextParagraph">{description}</p>
            </div>
        </div>
    )
}

const HomeSectionR = ({title, description, src})=> {
    return (
        <div className="sectionRight">
            <div className="sectionRightImage">
                <img className="rightImage" src={src}/>
                </div>
            <div className="sectionRightText">
                <h1 className="sectionRightTextTitle">{title}</h1>
                <p className="sectionRightTextParagraph">{description}</p>
            </div>
        </div>
    )
}

export { HomeSectionL, HomeSectionR };