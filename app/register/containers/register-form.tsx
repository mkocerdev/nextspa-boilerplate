"use client";

import ApiClient from "@/lib/api";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface FormData {
  firmName: string;
  countryId: string;
  cityId: string;
  countyId: string;
  districtId: string;
  address: string;
  name: string;
  surname: string;
  PhoneNumber: string;
  email: string;
  password: string;
  birthDate: Date;
  gender: number; // 0: Erkek, 1: Kadın, 2: Belirtmek istemiyorum
}
interface Country {
  id: string;
  name: string;
}

export function RegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { t } = useTranslation();

  const form = useForm<FormData>({
    defaultValues: {
      firmName: "",
      countryId: "c0bcf0c9-fea7-4cae-2fa0-08dc9ce35ae0",
      cityId: "",
      countyId: "",
      districtId: "",
      address: "",
      name: "",
      surname: "",
      PhoneNumber: "",
      email: "",
      password: "",
      birthDate: undefined,
      gender: 0,
    },
  });
  const {
    register,
    handleSubmit,
    setError,
    control,
    formState: { errors, isSubmitting },
  } = form;

  const countryId = useWatch({ name: "countryId", control });
  const cityId = useWatch({ name: "cityId", control });
  const countyId = useWatch({ name: "countyId", control });

  const [countries, setCountries] = useState<Country[]>();
  const [cities, setCities] = useState<Country[]>();
  const [counties, setCounties] = useState<Country[]>();
  const [districts, setDistricts] = useState<Country[]>();

  useEffect(() => {
    // Ülkeleri API'den al
    const fetchCountries = async () => {
      try {
        const response = await ApiClient.get("/Country");
        setCountries(response.data.data);
      } catch (error) {
        console.error("Ülkeler alınırken hata oluştu:", error);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (countryId) {
      // Şehirleri API'den al (Ülke seçildiğinde)
      const fetchCities = async () => {
        try {
          const response = await ApiClient.get(`/City/${countryId}`);
          setCities(response.data.data);
        } catch (error) {
          console.error("Şehirler alınırken bir hata oluştu:", error);
        }
      };
      fetchCities();
    }
  }, [countryId]);

  useEffect(() => {
    if (cityId) {
      // İlçeleri API'den al (Şehir seçildiğinde)
      const fetchCounties = async () => {
        try {
          const response = await ApiClient.get(`/County/${cityId}`);
          setCounties(response.data.data);
        } catch (error) {
          console.error("İlçeler alınırken hata oluştu:", error);
        }
      };
      fetchCounties();
    }
  }, [cityId]);

  useEffect(() => {
    if (countyId) {
      // Mahalleleri API'den al (İlçe seçildiğinde)
      const fetchDistricts = async () => {
        try {
          const response = await ApiClient.get(`/District/${countyId}`);
          setDistricts(response.data.data);
        } catch (error) {
          console.error("Mahalleler alınırken hata oluştu:", error);
        }
      };
      fetchDistricts();
    }
  }, [countyId]);
  // 2. Define a submit handler.
  const onSubmit = async (data: FormData) => {
    try {
      await ApiClient.post("/Auth/firm-register", {
        ...data,
        gender: Number(data.gender),
      });
      window.location.href = "/login";
    } catch (error: unknown) {
      // Handle other types of errors
      setError("root", {
        type: "server",
        message:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Form {...form}>
        {errors?.root?.message && (
          <p className="text-red-500 text-sm">{errors.root.message}</p>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-2">
            <div className="flex-1 mb-2">
              <h4 className="text-md font-bold leading-none">
                Kişisel Bilgiler
              </h4>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-6">
                <div className="flex-1 gap-2">
                  <FormItem>
                    <FormLabel> {t("signUp.form.name")}</FormLabel>
                    <FormControl>
                      <Input
                        {...register("name")}
                        placeholder="Enter your name"
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                </div>
                <div className="flex-1 gap-2">
                  <FormItem>
                    <FormLabel> {t("signUp.form.surname")}</FormLabel>
                    <FormControl>
                      <Input
                        {...register("surname")}
                        placeholder="Enter your surname"
                        type="text"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </div>
              <div className="flex flex-row gap-6">
                <div className="flex-1 gap-2">
                  <FormItem>
                    <FormLabel> {t("signUp.form.email")}</FormLabel>
                    <FormControl>
                      <Input
                        {...register("email")}
                        placeholder="Enter your email"
                        type="email"
                      />
                    </FormControl>
                  </FormItem>
                </div>
                <div className="flex-1 gap-2">
                  <FormItem>
                    <FormLabel> {t("signUp.form.phoneNumber")}</FormLabel>
                    <FormControl>
                      <Input
                        {...register("PhoneNumber")}
                        placeholder="Enter your email"
                        type="tel"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </div>
              <div className="flex flex-row gap-6">
                <div className="flex-1 gap-2">
                  <FormField
                    control={form.control}
                    name="birthDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date of birth</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className=" p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={
                                field.value ? new Date(field.value) : undefined
                              }
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() ||
                                date < new Date("1900-01-01")
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex-1 gap-2">
                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Cinsiyet</FormLabel>
                        <Select onValueChange={field.onChange}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Cinsiyet seçiniz" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {" "}
                            <SelectItem value="0">Erkek</SelectItem>
                            <SelectItem value="1">Kadın</SelectItem>
                            <SelectItem value="2">
                              Belirtmek İstemiyorum
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <div className="flex flex-row gap-6">
                <div className="flex-1 gap-2">
                  <FormItem>
                    <FormLabel> {t("signUp.form.password")}</FormLabel>
                    <FormControl>
                      <Input
                        {...register("password")}
                        placeholder="*********"
                        type="password"
                      />
                    </FormControl>
                  </FormItem>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-10">
            <div className="flex-1 mb-2">
              <h4 className="text-md font-bold leading-none">Firma Bilgiler</h4>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex-1 gap-2">
                <FormItem>
                  <FormLabel> {t("signUp.form.firmName")}</FormLabel>
                  <FormControl>
                    <Input
                      {...register("firmName")}
                      placeholder="Enter your firm name"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="countryId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ülke</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Ülke seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {countries?.map((country) => (
                            <SelectItem key={country.id} value={country.id}>
                              {country.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="cityId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Şehir</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Şehir seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {cities?.map((city) => (
                            <SelectItem key={city.id} value={city.id}>
                              {city.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="flex flex-row gap-6">
              <div className="flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="countyId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İlçe</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="İlçe seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {counties?.map((county) => (
                            <SelectItem key={county.id} value={county.id}>
                              {county.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex-1 gap-2">
                <FormField
                  control={form.control}
                  name="districtId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mahalle</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Mahalle seçiniz" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {districts?.map((district) => (
                            <SelectItem key={district.id} value={district.id}>
                              {district.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex-1 gap-2">
                <FormItem>
                  <FormLabel> {t("signUp.form.address")}</FormLabel>
                  <FormControl>
                    <Input
                      {...register("address")}
                      placeholder="Enter your address"
                      type="text"
                    />
                  </FormControl>
                </FormItem>
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full mt-6" disabled={isSubmitting}>
            {t("signUp.form.button")}
          </Button>
          <div className="mt-4 text-center text-sm">
            {t("login.form.dontHaveAccount") + " "}
            <a href="/login" className="underline underline-offset-4">
              {t("signUp.form.login")}
            </a>
          </div>
        </form>
      </Form>
    </div>
  );
}
