import React, { useState } from "react";
import styled, { css } from "styled-components";

type AccordeopnType = {
  isOpen: boolean;
};

export const AccordeonData = [
  {
    id: 1,
    title: "Header 1",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
  },
  {
    id: 2,
    title: "Header 2",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
  },
  {
    id: 3,
    title: "Header 3",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique,Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
  },
  {
    id: 4,
    title: "Header 4",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
  },
  {
    id: 5,
    title: "Header 5",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maxime similique, corrupti impedit vero explicabo eveniet fuga. Eaque ea rerum harum atque velit nihil, aliquam earum, itaque molestiae unde, ad a",
  },
];
export const Accordeon = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  const onAccClick = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <StyledAccordeon>
      <h2>Accordeon</h2>
      {AccordeonData.map((a) => {
        return (
          <AccBody key={a.id} isOpen={openId === a.id}>
            <Title
              onClick={() => {
                onAccClick(a.id);
              }}
            >
              <h3>{a.title}</h3>
              <Icon>&gt;</Icon>
            </Title>
            <Content>
              <p>{a.content}</p>
            </Content>
          </AccBody>
        );
      })}
    </StyledAccordeon>
  );
};

const StyledAccordeon = styled.div`
  width: 500px;
`;
export const AccBody = styled.div<AccordeopnType>`
  width: 100%;
  border-radius: 20px;
  background-color: #e5e3e3;

  &:not(:last-child) {
    margin-bottom: 20px;
  }

  ${(props) =>
    props.isOpen &&
    css<AccordeopnType>`
      ${Content} {
        display: block;
      }
      ${Icon} {
        transform: rotate(-90deg);
      }
    `}
`;

export const Icon = styled.span`
  padding: 10px;
  transform: rotate(90deg);
  transition: all 0.3s ease 0s;
`;

export const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #9e9d9d;
  border-radius: 20px;
  padding: 0 10px;
  cursor: pointer;
`;

export const Content = styled.div`
  display: none;
  padding: 10px;
`;
