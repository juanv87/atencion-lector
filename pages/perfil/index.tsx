import { ChangeEvent, MouseEvent, useState } from "react";
import ContainerPerfil from "../../components/Containers/ContainerPerfil/ContainerPerfil";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { newNickname, startChangeNickName } from "../../store/auth";

const Perfil = () => {
  const [newNickName, setNewNickName] = useState("");
  const { nickName } = useAppSelector((state) => state.auth);
  console.log("🚀 ~ file: index.tsx ~ line 9 ~ Perfil ~ nickName", nickName);
  const dispatch = useAppDispatch();
  const handleNickName = (e: ChangeEvent<HTMLInputElement>) => {
    setNewNickName(e.target.value);
  };
  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    dispatch(newNickname(newNickName));
    dispatch(startChangeNickName(newNickName));
  };
  return (
    <>
      <ContainerPerfil>
        <input
          onChange={handleNickName}
          type="text"
          placeholder={nickName || ""}
          name=""
          id=""
        />
        <button onClick={handleSubmit}>Cambiar NickName</button>
      </ContainerPerfil>
    </>
  );
};

export default Perfil;

export async function getServerSideProps() {
  // Check if the user is logged in
  return {
    props: {}, // will be passed to the page component as props
  };
}
