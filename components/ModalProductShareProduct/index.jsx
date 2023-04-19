import React from "react";
import { Copy } from "@styled-icons/evaicons-solid/Copy";
import * as S from "./styles";
import notification from "../../services/notification";

export default function ModalProductShareProduct({
  shareModal,
  setShareModal,
  slug,
  page,
}) {
  function copyText(link) {
    notification("Link copiado", "success");
    navigator.clipboard.writeText(link);
  }

  return (
    <S.ModalPhotobook className={shareModal}>
      <S.Transparent
        onClick={() => {
          document.body.style.overflow = "auto";

          setShareModal("inactive");
        }}
      />

      <S.AlertCenterPhotobook>
        <div className="modalTitle">
          <span className="title">Compartilhar Produto</span>
          <S.closeButton
            onClick={() => {
              document.body.style.overflow = "auto";

              setShareModal("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>
        <div className="caixaShare">
          <div className="title">Link de compartilhamento</div>
          <div className="containerCopyURL">
            <div className="url">
              <input
                readOnly
                type="text"
                value={`${process.env.NEXT_PUBLIC_REACT_APP_URL}/${page}/${slug}`}
              />
              <button
                className="copyButton"
                onClick={() =>
                  copyText(
                    `${process.env.NEXT_PUBLIC_REACT_APP_URL}/${page}/${slug}`
                  )
                }
              >
                <Copy />
              </button>
            </div>
            <div className="boxButtons">
              <a
                className="socialMediaButton positiveButton"
                href={`https://api.whatsapp.com/send?text= Olá, acaba de achar esse produto incrível no ${process.env.NEXT_PUBLIC_REACT_APP_NAME}. Click no link abaixo para acessá-lo. ${process.env.NEXT_PUBLIC_REACT_APP_URL}/${page}/${slug}`}
                target="_blank"
                rel="noreferrer"
              >
                Compartilhar
                <S.WhatsIcon />
              </a>
            </div>
          </div>
        </div>
      </S.AlertCenterPhotobook>
    </S.ModalPhotobook>
  );
}
