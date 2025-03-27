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
  const [progress, setProgress] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(0);
  const [time, setTime] = useState<number>(0);
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
      const res = await createProductRequest(
        formDataToSend,
        setProgress,
        setSpeed,
        setTime
      );

      form.reset();
      setFile(null);
      setFiles(null);
      setProgress(0);
      setName("");
      setDescription("");
      setPersonal("");
      setProfessional("");

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

  const estimatedTime = `${Math.floor(
    time > 60 ? (time > 3600 ? time / 3600 : time / 60) : time
  )}/${time > 60 ? (time > 3600 ? "h" : "m") : "s"}`;

  const velocity = `${Math.floor(
    speed > 1000 ? (speed > 1000000 ? speed / 1000000 : speed / 1000) : speed
  )}/${speed > 1000 ? (speed > 1000000 ? "Mb" : "Kb") : "B"}`;

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
            identifier="personal"
            type="number"
            step="0.01"
            placeholder="Precio personal"
          ></ProductInput>
          <ProductInput
            value={professional}
            setValue={setProfessional}
            required
            name="Professional"
            identifier="professional"
            type="number"
            step="0.01"
            placeholder="Precio Profesional"
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
          {progress > 0 ? (
            <div>
              <div className="w-full h-10 rounded-md bg-gray-300">
                <div
                  className="h-full rounded-md flex transition-[width] items-center justify-end pr-2 bg-indigo-500"
                  style={{ width: `${progress}%` }}
                >
                  <span className="text-xl font-medium text-gray-100">
                    {progress}%
                  </span>
                </div>
              </div>
              <p className="mt-2 ">
                <span className="text-xl font-medium pr-2 mr-2 border-r-2 border-gray-800">
                  Speed: {velocity}
                </span>
                <span className="text-xl font-medium">
                  Estimated time: {estimatedTime}
                </span>
              </p>
            </div>
          ) : (
            <button
              type="submit"
              disabled={loadingFile}
              className="px-4 py-2 w-44 h-14 flex flex-row items-center justify-center gap-2 border border-transparent text-xl font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Guardar
            </button>
          )}
        </form>
      </div>
    </>
  );
}
