import * as React from "react";
import PropTypes from "prop-types";
import { graphql } from "gatsby";
import { normalizedData } from "@utils";
import Layout from "@layout";
import Header from "@layout/header/layout-01";
import Footer from "@layout/footer/layout-01";
import HeroArea from "@containers/hero/layout-01";
import ServicesArea from "@containers/service/layout-01";
import PortfolioArea from "@containers/portfolio/layout-01";
import ResumeArea from "@containers/resume/layout-01";
import Security from "@containers/portfolio/layout-06";
import Cleaning from "@containers/portfolio/layout-06";
import Warehouse from "@containers/portfolio/layout-06";
import TestimonialArea from "@containers/testimonial/layout-01";
import ClientArea from "@containers/client/layout-01";
import PricingArea from "@containers/pricing/layout-01";
import BlogArea from "@containers/blog/layout-01";
import ContactArea from "@containers/contact/layout-01";
import EducationArea from "@containers/education/layout-01";
import SkillArea from "@containers/skill/layout-01";
import ExperienceArea from "@containers/experience/layout-01";
import InterviewArea from "@containers/interview/layout-01";
import ReactWhatsapp from 'react-whatsapp';
import icon from './whatsapp.png';

const IndexPage = ({ data }) => {
    const content = normalizedData(data?.homePage?.content || []);

    return (
        <Layout pageTitle="Home">
            <Header
                data={{
                    ...data.header,
                    ...data.navigation,
                    socials: data.site.siteMetadata.socials,
                }}
            />
            <div style={{
                position: "fixed", bottom: "110px", right: "33px", zIndex: "9999", width: '50px'
            }}>
                <a href="https://wa.me/+17788634021">
                    <img src={icon} alt="whatsapp" />
                </a>
            </div >



            <main className="main-page-wrapper">
                <HeroArea
                    data={{
                        ...content["hero-section"],
                        socials: data.site.siteMetadata.socials,
                    }}
                />
                <PortfolioArea data={content["portfolio-section"]} />
                <Security data={content["security-section"]} />
                <Cleaning data={content["cleaning-section"]} />
                <Warehouse data={content["warehouse-section"]} />
                <ContactArea
                    data={{
                        ...content["contact-section"],
                        socials: data.site.siteMetadata.socials,
                        phone: data.site.siteMetadata?.contact?.phone,
                        email: data.site.siteMetadata?.contact?.email,
                        getform_url: data.site.siteMetadata?.getform_url,
                    }}
                />
            </main>

            <Footer data={{ ...data.footer }} className="section-separator" />
        </Layout >
    );
};

export const query = graphql`
                query DefaultPageQuery {
                    site {
                    ...Site
                }
                header: general(section: {eq: "header-1" }) {
                    ...Header01
                }
                navigation: general(section: {eq: "menu-1" }) {
                    menu {
                    ...Menu01
                }
        }
                footer: general(section: {eq: "footer-1" }) {
                    ...Footer01
                }
                homePage(title: {eq: "default-home" }) {
                    content {
                    ...Content01
                }
        }
                allArticle(limit: 3) {
                    nodes {
                    ...Article
                }
        }
    }
                `;

IndexPage.propTypes = {
    data: PropTypes.shape({
        site: PropTypes.shape({
            siteMetadata: PropTypes.shape({
                socials: PropTypes.arrayOf(PropTypes.shape({})),
                contact: PropTypes.shape({
                    phone: PropTypes.string,
                    email: PropTypes.string,
                }),
                getform_url: PropTypes.string,
            }),
        }),
        homePage: PropTypes.shape({
            content: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        allArticle: PropTypes.shape({
            nodes: PropTypes.arrayOf(PropTypes.shape({})),
        }),
        navigation: PropTypes.shape({}),
        header: PropTypes.shape({}),
        footer: PropTypes.shape({}),
    }),
};

export default IndexPage;
