import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export const AddLike = ({
    handleLike,
    cocktailId
}) => {

    return (
        <div >
            <FontAwesomeIcon
                icon={faHeart}
                onClick={() => handleLike(cocktailId)}
            />
        </div>
    )
}