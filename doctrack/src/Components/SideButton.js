const SideButton = (props) => {
    const {
        buttonText,
        buttonIcon,
        buttonClass,
        buttonClick,
        buttonId,
    } = props;
    return (
        <button
        className={buttonClass}
        onClick={buttonClick}
        id={buttonId}
        >
        <i className={buttonIcon} />
        <span>{buttonText}</span>
        </button>
    );
}

export default SideButton;