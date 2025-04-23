import { ModalLocalization } from "../../../constants/Localization/Localization";

interface Option {
  _id: string;
  name: string;
}

export default function OptionsValidation({ options }: { options: Option[] }) {
  return options.map((option: Option, index: number) => (
    <option key={index} value={option._id}>
      {option.name === "Sanitary"
        ? ModalLocalization.sanitary
        : option.name === "Cosmetics"
        ? ModalLocalization.cosmetics
        : option.name === "Hair"
        ? ModalLocalization.Hair
        : option.name === "Electrical"
        ? ModalLocalization.Electrical
        : option.name === "PowderCream"
        ? ModalLocalization.PowderCream
        : option.name === "CheekBlush"
        ? ModalLocalization.CheekBlush
        : option.name === "Mascara"
        ? ModalLocalization.Mascara
        : option.name === "EyeShadow"
        ? ModalLocalization.EyeShadow
        : option.name === "EyePencil"
        ? ModalLocalization.EyePencil
        : option.name === "EyebrowPencil"
        ? ModalLocalization.EyebrowPencil
        : option.name === "Lipstick"
        ? ModalLocalization.Lipstick
        : option.name === "Creams"
        ? ModalLocalization.Creams
        : option.name === "BodyWash"
        ? ModalLocalization.BodyWash
        : option.name === "Cleaner"
        ? ModalLocalization.Cleaner
        : option.name === "Shampoo"
        ? ModalLocalization.Shampoo
        : option.name === "HairMask"
        ? ModalLocalization.HairMask
        : option.name === "HairSerum"
        ? ModalLocalization.HairSerum
        : option.name === "HairGel"
        ? ModalLocalization.HairGel
        : option.name === "HairDryer"
        ? ModalLocalization.HairDryer
        : option.name === "HairStraightener"
        ? ModalLocalization.HairStraightener
        : option.name === "Sunscreen"
        ? ModalLocalization.Sunscreen
        : option.name === "trimmer"
        ? ModalLocalization.trimmer
        : option.name === "Concealer"
        ? ModalLocalization.Concealer
        : option.name === "Eyeliner"
        ? ModalLocalization.Eyeliner
        : option.name}
    </option>
  ));
}
