import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Link from "next/link";

import * as S from "./style";
import { ToastContainer } from "react-toastify";
import notification from "../../services/notification";
import "react-toastify/dist/ReactToastify.css";

function ProfileComponent({
  routeTranslations,
  handleLogout,
  setCartLength,
  api,
  mktName,
}) {
  const history = useRouter();

  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [promoterValidate, setPromoterValidate] = useState(false);

  useEffect(() => {
    document.body.style.overflow = "auto";

    const token = localStorage.getItem(mktName);

    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`;
    } else {
      history.push("/");
    }

    async function getUser() {
      try {
        const token = localStorage.getItem(mktName);

        if (token) {
          api.defaults.headers.Authorization = `Bearer ${token}`;
        } else {
          notification("Sua sessão expirou, faça o login novamente", "error");
          sessionStorage.setItem("urlantiga", window.location.href);

          setCartLength("0");
          setTimeout(function () {
            window.location.href = "/login";
          }, 3000);
        }

        const { data: response } = await api.get("/customer/get");
        const { data: responseAuth } = await api.get("/customer/auth/validate");

        setPromoterValidate(responseAuth);
        setUserName(response.name);
        setEmail(response.email);
      } catch (err) {
        console.error(err);
      } finally {
      }
    }

    getUser();
  }, []);

  function logout() {
    sessionStorage.removeItem(mktName);
    localStorage.removeItem(`${mktName}_username`);

    handleLogout();
  }

  return (
    <>
      {routeTranslations !== undefined && routeTranslations !== false ? (
        <S.Container>
          <S.UserInfoBox>
            <S.UserImage />
            <S.UserInfo>
              <h2>{userName}</h2>
              <p>{email}</p>
            </S.UserInfo>
          </S.UserInfoBox>

          <S.ProfileCardsContainer>
            <S.LeftProfileCards>
              <Link href="/profile/edit" passhref="true">
                <S.ProfileCard>
                  {" "}
                  <S.EditIcon />
                  <p>
                    {routeTranslations !== false &&
                      routeTranslations.labels.label01}
                  </p>
                </S.ProfileCard>
              </Link>
              <Link href="/profile/addresses" passhref="true">
                <S.ProfileCard>
                  <S.LocationIcon />
                  <p>
                    {" "}
                    {routeTranslations !== false &&
                      routeTranslations.labels.label02}
                  </p>
                </S.ProfileCard>
              </Link>
              <Link href="/profile/photobook" passhref="true">
                <S.ProfileCard>
                  <S.BuildingIcon />
                  <p>
                    {promoterValidate.promoter !== undefined &&
                    promoterValidate.promoter === true
                      ? routeTranslations !== false &&
                        routeTranslations.labels.label03
                      : routeTranslations !== false &&
                        routeTranslations.labels.label04}
                  </p>
                </S.ProfileCard>
              </Link>
              <Link href="/profile/likes" passhref="true">
                <S.ProfileCard>
                  <S.UserLockIcon />
                  <p>
                    {routeTranslations !== false &&
                      routeTranslations.labels.label05}
                  </p>
                </S.ProfileCard>
              </Link>
            </S.LeftProfileCards>
            <S.RightProfileCards>
              <Link href="/profile/orders" passhref="true">
                <S.ProfileCard>
                  {" "}
                  <S.PackageIcon />
                  <p>
                    {routeTranslations !== false &&
                      routeTranslations.labels.label06}
                  </p>
                </S.ProfileCard>
              </Link>

              <Link href="/profile/addpaymentmethod" passhref="true">
                <S.ProfileCard>
                  {" "}
                  <S.CreditCardIcon />
                  <p>
                    {routeTranslations !== false &&
                      routeTranslations.labels.label07}
                  </p>
                </S.ProfileCard>
              </Link>
              <Link href="/profile/wishlist" passhref="true">
                <S.ProfileCard>
                  <S.BookIcon />
                  <p>
                    {routeTranslations !== false &&
                      routeTranslations.labels.label08}
                  </p>
                </S.ProfileCard>
              </Link>
            </S.RightProfileCards>
          </S.ProfileCardsContainer>
          <Link href="/" passhref="true" onClick={() => logout()}>
            <S.LogOutButton onClick={() => logout()}>
              <S.LogOutIcon />
              <p>
                {routeTranslations !== false &&
                  routeTranslations.labels.button01}
              </p>
            </S.LogOutButton>
          </Link>
        </S.Container>
      ) : (
        <S.ContainerLoading>
          <img src="/images/loadingIcon.svg" alt="loading" />
        </S.ContainerLoading>
      )}
      <ToastContainer />
    </>
  );
}

export default ProfileComponent;
