import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../constants";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TagGroups from "./TagGroups";
import Faded from "../../shared/Faded";
import logo from "../../../assets/pairamid-logo.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const FeedbackRequest = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const { userId } = useParams();
  const [user, setUser] = useState();

  const [showSuccess, setShowSuccess] = useState(false);
  const successZone = showSuccess ? "block" : "hidden";
  const successMessage = showSuccess ? (
    <Faded duration={30} isOut={true}>
      <p className="w-full text-xl text-center text-green">
        Your feedback has been sent! Thank you for the feedback!
      </p>
    </Faded>
  ) : (
    <div />
  );

  const [selectedTags, setSelectedTags] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    axios.get(`${API_URL}/users/${userId}/feedback/new`).then((response) => {
      setUser(response.data);
    });
  }, [userId]);

  const onUpdate = (data, e) => {
    let payload = { ...data, ...{ tags: selectedTags.map((tag) => tag.id) } };
    axios.post(`${API_URL}/feedbacks`, payload).then(() => {
      setSelectedTags([]);
      e.target.reset();
      setShowSuccess(true);
    });
    setShowSuccess(false);
  };
  if (!user) {
    return null;
  }
  return (
    <div className="grid grid-cols-1">
      <header className="p-3 border-gray-border border-b-2">
        <div className="flex items-center justify-between">
          <Link className="mx-2" to="/">
            <img
              src={logo}
              alt="Paramid Logo"
              width="169"
              height="40"
              className="w-full max-w-logo"
            />
          </Link>
          {currentUser && (
            <Link
              className="focus:outline-none mx-2"
              to={`/users/${currentUser.uuid}`}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          )}
        </div>
      </header>
      <main className="bg-gray-light col-span-1 p-2 lg:p-12 h-screen">
        <section className="flex justify-center">
          <div className="w-full md:w-3/4 lg:w-1/2 mb-4">
            <form
              className="bg-white shadow-lg rounded-lg rounded-b-none p-4 mx-2"
              onSubmit={handleSubmit(onUpdate)}
            >
              <div className="">
                <div className="flex items-center justify-between">
                  <h2 className="">Feedback for {user.fullName}</h2>
                </div>
                <div className="grid grid-cols-2 gap-x-4 items-center my-4">
                  <div className="col-span-2 md:col-span-1 flex items-center">
                    <p className="text-sm font-bold">From </p>
                    <input
                      className={`border-b border-gray-border p-2 outline-none text-center text-sm`}
                      id="authorName"
                      type="text"
                      name="authorName"
                      placeholder="Anonymous"
                      defaultValue={""}
                      ref={register}
                    />
                  </div>
                </div>
                {errors.message && (
                  <p className="text-red">
                    Please add a short message to your feedback. Thanks.
                  </p>
                )}
                <p className="text-sm font-bold">
                  Message
                  <span className="text-xs text-gray ml-2">
                    ( Check out the tags for targeted feedback areas. )
                  </span>
                </p>
                <textarea
                  name="message"
                  className="h-32 border border-gray-border w-full my-2 p-2"
                  placeholder="Situation-Behavior-Impact..."
                  defaultValue={""}
                  ref={register({ required: true })}
                />
                <input
                  className=""
                  type="hidden"
                  name="recipientId"
                  defaultValue={user.id}
                  ref={register}
                />
                <div className={`py-4`}>
                  <TagGroups
                    groups={user.feedbackTagGroups}
                    tags={selectedTags}
                    setTags={setSelectedTags}
                    tagCounts={{}}
                    defaultExpand={false}
                  />
                </div>
                <div className={`mb-2 ${successZone}`}>{successMessage}</div>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-green-icon w-full p-3 text-white font-bold"
                />
              </div>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
};

export default FeedbackRequest;
