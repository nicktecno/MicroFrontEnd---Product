import React, { useEffect, useState } from "react";

// componentes boostrap
import Accordion from "react-bootstrap/Accordion";

// Css do componente
import * as S from "./style";

function ProductDetails({ produto, showValue, tecnicos }) {
  const [descricao, setDescricao] = useState("");
  const [carregando, setCarregando] = useState(false);
  const [extraAttr, setExtraAttr] = useState([]);
  useEffect(() => {
    if (produto) {
      setDescricao(showValue(produto.attributes, "description"));
      setCarregando(true);
    } else {
      setCarregando(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produto]);
  useEffect(() => {
    if (produto) {
      setDescricao(showValue(produto.attributes, "description"));
      setCarregando(true);
      const attrGroup = produto.attribute_group.filter(
        ({ name }) => name === "Detalhes do Produto"
      );
      function showValueBoolean(produto, atributo, manual = false) {
        const value = produto.find(
          (attr) => attr.attribute[0].code === atributo
        );

        if (!manual && atributo === "installation_manual") {
          return false;
        }

        if (value) {
          return value.boolean_value === 1 ? "Sim" : "Não";
        } else {
          return false;
        }
      }

      if (attrGroup.length > 0) {
        const additionalAttrs = attrGroup[0].attributes?.map((att) => {
          if (att.type === "boolean") {
            return {
              [att.admin_name]: showValueBoolean(produto.attributes, att.code),
            };
          } else {
            return {
              [att.admin_name]: showValue(produto.attributes, att.code),
            };
          }
        });
        setExtraAttr(additionalAttrs);
      }
    } else {
      setCarregando(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [produto]);

  return (
    <S.ContainerGeral>
      {carregando && produto.name && (
        <>
          <Accordion className="accordion1">
            {descricao && (
              <div className="ContainerItem descricao">
                <>
                  <h3>Descrição</h3>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: descricao,
                    }}
                  ></p>
                </>
              </div>
            )}
          </Accordion>
          {tecnicos && (
            <Accordion className="accordion2">
              <div className="ContainerItem">
                <Accordion.Toggle eventKey="1">
                  ESPECIFICAÇÕES DO PRODUTO{" "}
                  <span className="">
                    <S.arrowUp />
                  </span>
                </Accordion.Toggle>
                <div className="containerMap">
                  <Accordion.Collapse eventKey="1">
                    <p>{tecnicos}</p>
                  </Accordion.Collapse>
                </div>
              </div>
            </Accordion>
          )}
        </>
      )}

      <S.imageContainer>
        <img src={showValue(produto.attributes, "descriptive_image")} />
      </S.imageContainer>
      {extraAttr.length > 0 && (
        <S.tableContainer>
          <table>
            <thead>
              <tr>
                <th>Detalhes do Produto</th>
              </tr>
            </thead>
            <tbody>
              {extraAttr?.map((attr, attrIndex) => {
                const attrEntries = Object.entries(attr)[0];
                return (
                  <React.Fragment key={attrIndex}>
                    {!attrEntries[0] || !attrEntries[1] ? (
                      <></>
                    ) : (
                      <tr>
                        <td>
                          <p>{attrEntries[0]}</p>
                        </td>
                        {!attrEntries[1] ? (
                          ""
                        ) : attrEntries[1].includes("http") ? (
                          <td>
                            <a
                              target="_blank"
                              href={attrEntries[1]}
                              rel="noreferrer"
                            >
                              Clique para abrir o Link
                            </a>
                          </td>
                        ) : (
                          <td>{attrEntries[1]}</td>
                        )}
                      </tr>
                    )}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </S.tableContainer>
      )}
    </S.ContainerGeral>
  );
}

export default ProductDetails;
