import { useState } from "react";
import { ProductInput } from "../components/ProductInputs/ProductInput.tsx";
import { ProductInputGallery } from "../components/ProductInputs/ProductInputGallery.tsx";
import { ProductInputImage } from "../components/ProductInputs/ProductInputImage.tsx";
import { X } from "lucide-react";
import { toast } from "sonner";
import { createProductRequest } from "../api/products.ts";
import { ProductInputRar } from "../components/ProductInputs/ProductInputRar.tsx";

export function ProductAdder() {
  const [errors, setErrors] = useState<string[] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [files, setFiles] = useState<File[] | null>(null);
  const [rar, setRar] = useState<File | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [personal, setPersonal] = useState<string | null>(null);
  const [professional, setProfessional] = useState<string | null>(null);
  const [loadingFile, setLoadingFile] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const formDataToSend = new FormData();

    formDataToSend.append("title", formData.get("title") as string);
    formDataToSend.append("description", formData.get("description") as string);
    formDataToSend.append("personal", formData.get("personal") + "");
    formDataToSend.append("professional", formData.get("professional") + "");
    formDataToSend.append("image", formData.get("image") as File);

    const gallery = formData.getAll("gallery") as File[];

    gallery.forEach((item) => {
      formDataToSend.append("gallery", item);
    });

    const toastId = toast.loading("Producto enviado a guardar");

    try {
      const res = await createProductRequest(formDataToSend);

      form.reset();
      setFile(null);
      setFiles(null);

      if (res.status == 200) {
        toast.success("Producto guardado", { id: toastId });
      } else {
        toast.error("Ocurrio un error", { id: toastId });
      }
    } catch (error) {
      console.log(error);
      toast.error("Ocurrio un error", { id: toastId });
    }
  };

  return (
    <>
      <div className="w-full flex flex-col items-center">
        {errors ? (
          <div className="relative w-3xl bg-red-400 flex flex-col p-4 rounded-lg mt-4 items-start gap-1  outline-none ring-2 ring-offset-2 ring-red-400">
            <X
              className="absolute right-2 top-2"
              onClick={() => {
                setErrors(null);
              }}
            ></X>
            {errors.map((item, index) => {
              return (
                <span key={index * 100} className="text-2xl">
                  {item}
                </span>
              );
            })}
          </div>
        ) : (
          <></>
        )}
        <form
          action=""
          className="flex flex-col gap-4 mt-10"
          onSubmit={handleSubmit}
        >
          <ProductInput
            value={name}
            setValue={setName}
            required
            name="Titulo"
            identifier="title"
            type="text"
            placeholder="Titulo del producto"
          />
          <ProductInput
            value={description}
            setValue={setDescription}
            required
            name="Descripción"
            identifier="description"
            type="textarea"
            placeholder="Descripcion del producto"
          ></ProductInput>
          <ProductInput
            value={personal}
            setValue={setPersonal}
            required
            name="Personal"
            identifier="Personal"
            type="number"
            placeholder="Precio del producto"
          ></ProductInput>
          <ProductInput
            value={professional}
            setValue={setProfessional}
            required
            name="Professional"
            identifier="Professional"
            type="number"
            placeholder="Precio del producto"
          ></ProductInput>
          <ProductInputImage
            required
            file={file}
            setFile={setFile}
            name="Imagen Principal"
            identifier="image"
            placeholder="Imagen principal del producto"
          ></ProductInputImage>
          <ProductInputGallery
            required
            files={files}
            setFiles={setFiles}
            name="Galeria"
            identifier="gallery"
            placeholder="Selecciona las imagenes de galeria del producto"
          ></ProductInputGallery>
          {/* <ProductInputRar
            required
            loadingFile={loadingFile}
            setLoadingFile={setLoadingFile}
            file={rar}
            setFile={setRar}
            name="Archivo Rar"
            identifier="rar"
            placeholder="Archivo rar del producto"
          ></ProductInputRar> */}
          <button
            type="submit"
            disabled={loadingFile}
            className="px-4 py-2 w-44 h-14 flex flex-row items-center justify-center gap-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Guardar
          </button>
        </form>
      </div>
    </>
  );
}
