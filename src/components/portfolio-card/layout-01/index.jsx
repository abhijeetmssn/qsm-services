import React, { useState } from "react";
import PropTypes from "prop-types";
import { ImageType, TextType } from "@utils/types";
import Image from "@ui/image";
import Anchor from "@ui/anchor";
import Icon from "@ui/icon";
import PortfolioModal from "@components/modal-portfolio";
import { Link } from "react-scroll";

const PortfolioCard = ({ title, category, likeCount, image, path, texts }) => {
    function handleClick() {
        scroll.scrollTo('#home', {
            to: 'home',
            spy: true,
            smooth: true,
            offset: -50,
            duration: 500
        });
    }


    const [show, setShow] = useState(false);
    return (
        <>
            <div
                className="rn-portfolio"
                role="button"
                tabIndex="-1"
            >
                <Link
                    activeClass="active"
                    className="nav-link smoth-animation"
                    href={`#${path}`}
                    to={path}
                    spy={true}
                    smooth={true}
                    offset={-50}
                    duration={500}>

                    <div className="inner">
                        <div>

                            <Image src={image.src} alt={image?.alt || title} />

                        </div>
                        <div className="content">
                            <div className="category-info">
                                <div className="category-list">
                                    {category}
                                </div>
                            </div>
                            <h4 className="title">

                                {title}
                                <Icon name="ArrowUpRight" />

                            </h4>
                        </div>
                    </div>
                </Link>
            </div>

        </>
    );
};

PortfolioCard.propTypes = {
    title: PropTypes.string.isRequired,
    category: PropTypes.string,
    likeCount: PropTypes.number,
    image: PropTypes.shape(ImageType).isRequired,
    path: PropTypes.string.isRequired,
    texts: PropTypes.arrayOf(PropTypes.shape(TextType)),
};

export default PortfolioCard;
