"use client";

import styled from "styled-components";
import { ModalLocalization } from "../../../constants/Localization/Localization";
import { toast } from "react-toastify";
import OptionsValidation from "./optionsValidation";

export interface select {
  _id: string;
  name: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  slugname: string;
}

interface ModalSelectOptionProps {
  className?: string;
  name: string;
  options: select[];
  setSelectedCategory?: (category: string) => void;
  setSelectedSubCategory?: (subCategory: string) => void;
  disabled?: boolean;
}

export default function ModalSelectOption({
  className,
  name,
  options,
  setSelectedCategory,
  setSelectedSubCategory,
  disabled,
}: ModalSelectOptionProps) {
  return (
    <StyledWrapper className={className}>
      <div
        className="select-option relative"
        onClick={() => {
          if (name === "subcategory" && disabled) {
            toast.error(ModalLocalization.selectSubCategoryAlert);
          }
        }}
      >
        {disabled && (
          <div className="absolute inset-0 z-20 cursor-not-allowed" />
        )}

        <select
          name={name}
          className="w-full h-full px-5 py-3 rounded-[1.3rem] z-10 bg-white"
          required
          disabled={disabled}
          onChange={(e) => {
            if (name === "category") {
              setSelectedCategory?.(e.target.value);
            } else if (name === "subCategory") {
              setSelectedSubCategory?.(e.target.value);
            }
          }}
        >
          <option value="" disabled hidden selected>
            {name === "category"
              ? ModalLocalization.selectCategory
              : ModalLocalization.selectSubCategory}
          </option>
          {OptionsValidation({ options })}
        </select>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .select-option {
    position: relative;
    font-family: Arial, Helvetica, sans-serif;
    width: 40%;
    height: 80%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
  }

  .select-option {
    border: solid 1.9px #9e9e9e;
    border-radius: 1.3rem;
    background: none;
    font-size: 1rem;
    color: #000000;
    transition: border 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .textUser {
    position: absolute;
    right: 15px;
    top: -2px;
    color: #666666;
    pointer-events: none;
    transform: translateY(1rem);
    transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  }

  .select-option:focus,
  select:valid {
    outline: none;
    box-shadow: 1px 2px 5px rgba(133, 133, 133, 0.523);
    background-image: linear-gradient(
      to top,
      rgba(182, 182, 182, 0.199),
      rgba(252, 252, 252, 0)
    );
    transition: background 4s ease-in-out;
  }

  .select-option:focus ~ label,
  select:valid ~ label {
    transform: translateY(-95%) scale(0.95);
    padding: 0 0.2em;
    color: #000000be;
    right: 20px;
  }

  .select-option:hover {
    border: solid 1.9px #000002;
    transform: scale(1.03);
    box-shadow: 1px 1px 5px rgba(133, 133, 133, 0.523);
    transition: border-color 1s ease-in-out;
  }
`;
