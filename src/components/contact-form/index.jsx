import React, { useState } from "react";
import axios from "axios";
import { ArrowRight } from "react-feather";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import emailjs from '@emailjs/browser';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './custom.css'

import cn from "clsx";
import {
    FormGroup,
    Label,
    Input,
    Textarea,
    ErrorText,
} from "@ui/form-elements";
import Button from "@ui/button";
import { Background } from "react-parallax";

const ContactForm = ({ className, url }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        mode: "onChange",
    });
    const [serverState, setServerState] = useState({
        submitting: false,
        status: null,
    });
    const handleServerResponse = (ok, msg, form) => {
        setServerState({
            submitting: false,
            status: { ok, msg },
        });
        if (ok) {
            form.reset();
        }
    };
    const onSubmit = (data, e) => {
        emailjs.sendForm('service_vu8ihoa', 'template_0u3hdfd', e.target, 'rsV3mM9xnPajNKshW')
            .then((result) => {
                toast.success("Message sent!", {
                    closeButton: false
                });
            }, (error) => {
                toast.error("Message not sent!", {
                    closeButton: false
                });
            });
        e.target.reset();
    };

    return (
        <div className={cn("contact-form-wrapper", className)}>
            <div className="introduce">
                <ToastContainer
                    position="top-right"
                    autoClose={1500}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                    style={{ whiteSpace: 'nowrap' }}
                />
                <form
                    className="rnt-contact-form rwt-dynamic-form row"
                    id="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div className="col-lg-6">
                        <FormGroup>
                            <Label htmlFor="name">Your Name</Label>
                            <Input
                                name="name"
                                id="name"
                                type="text"
                                {...register("name", {
                                    required: "Name is required",
                                })}
                            />
                            {errors.name && (
                                <ErrorText>{errors.name?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-6">
                        <FormGroup>
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input
                                name="phone"
                                id="phone"
                                type="text"
                                {...register("phone", {
                                    required: "Phone is required",
                                })}
                            />
                            {errors.phone && (
                                <ErrorText>{errors.phone?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                {...register("email", {
                                    required: "Email is required",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "invalid email address",
                                    },
                                })}
                            />
                            {errors.email && (
                                <ErrorText>{errors.email?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="subject">subject</Label>
                            <Input
                                id="subject"
                                name="subject"
                                type="text"
                                {...register("subject", {
                                    required: "Subject is required",
                                })}
                            />
                            {errors.subject && (
                                <ErrorText>{errors.subject?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <FormGroup>
                            <Label htmlFor="message">Your Message</Label>
                            <Textarea
                                name="message"
                                id="message"
                                {...register("message", {
                                    required: "Message is required",
                                })}
                            ></Textarea>
                            {errors.message && (
                                <ErrorText>{errors.message?.message}</ErrorText>
                            )}
                        </FormGroup>
                    </div>

                    <div className="col-lg-12">
                        <Button type="submit">
                            <span>SEND MESSAGE</span>
                            <ArrowRight />
                        </Button>
                        {serverState.status && (
                            <p
                                className={`mt-4 font-14 ${!serverState.status.ok
                                    ? "text-red"
                                    : "text-success"
                                    }`}
                            >
                                {serverState.status.msg}
                            </p>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

ContactForm.propTypes = {
    className: PropTypes.string,
    url: PropTypes.string,
};

export default ContactForm;
