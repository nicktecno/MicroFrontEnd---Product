import currencyFormat from "../../services/currencyFormat";
import * as S from "./styles";

export function ModalProductPortionsList({
  modalPortionsActive,
  setModalPortionsActive,
  portions,
}) {
  return (
    <S.Modal className={modalPortionsActive}>
      <S.Transparente
        onClick={() => {
          document.body.style.overflow = "auto";

          setModalPortionsActive("inactive");
        }}
      />

      <S.centerModal>
        <div className="modalTitle">
          <span className="title">Opções de parcelamento</span>
          <S.closeButton
            onClick={() => {
              document.body.style.overflow = "auto";

              setModalPortionsActive("inactive");
            }}
          >
            x
          </S.closeButton>
        </div>

        <S.ContainerInputs>
          {Object.values(portions.portionsTotal).map((portion, index) => (
            <div
              key={index}
              className={
                index % 2 === 0 ? "containerPortion gray" : "containerPortion"
              }
            >
              <div className="value">
                {index + 1} x{" "}
                {portion.interest === false ? "sem juros" : "com juros"}
              </div>
              <div className="type">{currencyFormat(portion.value)}</div>
            </div>
          ))}
        </S.ContainerInputs>
      </S.centerModal>
    </S.Modal>
  );
}
