import { useEffect, useState } from "react";
import { useFoodDataMutate } from "../../hooks/useFoodDataMutate";
import type { FoodData } from "../../interface/FoodData";

import "./modal.css"

interface InputProps {
    label: string,
    value: string | number,
    updateValue(value: any): void
}

interface ModalProps {
    closeModal(): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
    return (
        <>
            <label>{label}</label>
            <input value={value} onChange={event => updateValue(event.target.value)} />
        </>
    )
}

export function CreateModal({ closeModal }: ModalProps) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");

    
    const mutation = useFoodDataMutate();

    const submit = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault(); 
        const foodData: FoodData = { title, price, image };
        mutation.mutate(foodData);
    }

   
    useEffect(() => {
        if (mutation.status === "success") {
            closeModal();
        }
    }, [mutation.status, closeModal])

    return (
        <div className="modal-overlay">
            <div className="modal-body">
                <h2>Cadastre um novo prato no cardápio</h2>
                <form className="input-container">
                    <Input label="title" value={title} updateValue={setTitle} />
                    <Input label="price" value={price} updateValue={setPrice} />
                    <Input label="image" value={image} updateValue={setImage} />
                    <button
                        onClick={submit}
                        className="btn-secundary"
                        disabled={mutation.status === "pending"}
                    >
                        {mutation.status === "pending" ? 'Postando...' : 'Adicionar Novo Prato'}
                    </button>
                    {mutation.status === "error" && <p style={{ color: 'red' }}>Ocorreu um erro ao adicionar o prato.</p>}
                </form>
            </div>
        </div>
    )
}