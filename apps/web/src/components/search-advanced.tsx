"use client";
import { useRouter } from "next/navigation";

import {
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Button,
  Input,
  Label,
  Checkbox,
  useForm,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  zodResolver,
  z,
} from "@sicap/ui";

const db = [
  {
    id: "licitatii-publice",
    label: "Licitatii publice",
  },
  {
    id: "achizitii-directe",
    label: "Achizitii directe",
  },
] as const;

const formSchema = z
  .object({
    q: z.string().optional(),
    db: z.array(z.string()).refine((value) => value.some((item) => item), {
      message: "Selecteaza cel putin una.",
    }),
    dateFrom: z.string().optional(),
    dateTo: z.string().optional(),
    cpv: z.string().optional(),
    authority: z.string().optional(),
    supplier: z.string().optional(),
    valueFrom: z.string().optional(),
    valueTo: z.string().optional(),
    locality: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.valueFrom && data.valueTo) {
        return parseInt(data.valueFrom) < parseInt(data.valueTo);
      }
      return true;
    },
    {
      message: "Valoarea minima trebuie sa fie mai mica decat valoarea maxima.",
      path: ["valueFrom"],
    },
  )
  .refine(
    (data) => {
      if (
        !data.q &&
        !data.dateFrom &&
        !data.dateTo &&
        !data.cpv &&
        !data.authority &&
        !data.supplier &&
        !data.valueFrom &&
        !data.valueTo &&
        !data.locality
      ) {
        return false;
      }
      return true;
    },
    {
      message: "Cel putin un camp trebuie completat.",
      path: ["query"],
    },
  );

export function AdvancedSearch({ query }: { query: string }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      q: query,
      db: ["licitatii-publice", "achizitii-directe"],
      cpv: "",
      authority: "",
      supplier: "",
      valueFrom: "",
      valueTo: "",
      locality: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const params = new URLSearchParams(
      Array.from(
        Object.entries({
          ...values,
          db: values.db.join(","),
        }).filter(([_, value]) => {
          return value !== "" && value !== undefined && value !== null;
        }),
      ),
    );
    router.push(`/cauta?${params.toString()}`);
  }

  return (
    <DialogContent className="sm:max-w-[540px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Cautare avansata</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-8">
            <div className="grid grid-cols-4 items-center gap-4">
              <FormLabel htmlFor="query" className="text-right">
                Termen de cautare
              </FormLabel>
              <FormField
                control={form.control}
                name="q"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input id="query" type="search" {...field} placeholder="cauta orice..." />
                    </FormControl>
                    <FormMessage withToast />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <FormLabel htmlFor="db" className="text-right">
                  Baza de date
                </FormLabel>
                <FormField
                  control={form.control}
                  name="db"
                  render={() => (
                    <FormItem className="col-span-3">
                      <div className="flex items-center gap-4">
                        {db.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="db"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={item.id}
                                  className="flex items-center space-x-2 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(item.id)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, item.id])
                                          : field.onChange(
                                              field.value?.filter((value) => value !== item.id),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-right text-xs sm:text-sm">
                                    {item.label}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage withToast />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="date1" className="text-right">
                Data publicarii
              </Label>
              <div className="flex flex-1 sm:flex-row flex-col col-span-3 items-center">
                <FormField
                  control={form.control}
                  name="dateFrom"
                  render={({ field }) => (
                    <FormItem className="col-span-3 w-full">
                      <FormControl>
                        <Input id="dateFrom" type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <span className="mx-2">-</span>
                <FormField
                  control={form.control}
                  name="dateTo"
                  render={({ field }) => (
                    <FormItem className="col-span-3 w-full">
                      <FormControl>
                        <Input id="dateTo" type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cpv" className="text-right">
                Cod CPV
              </Label>
              <FormField
                control={form.control}
                name="cpv"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input
                        id="cpv"
                        className="col-span-3"
                        placeholder="44113620-7 - Asfalt"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="authority" className="text-right">
                Autoritate
              </Label>
              <FormField
                control={form.control}
                name="authority"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <FormControl>
                      <Input
                        id="authority"
                        className="col-span-3"
                        placeholder="Primaria Baicoi"
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firma" className="text-right">
                Firma
              </Label>
              <FormField
                control={form.control}
                name="supplier"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Input
                      id="supplier"
                      className="col-span-3"
                      placeholder="Firma SRL"
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="val1" className="text-right">
                Valoare contract
              </Label>
              <div className="flex flex-1 col-span-3 items-center">
                <FormField
                  control={form.control}
                  name="valueFrom"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <Input id="valueFrom" min={0} type="number" placeholder="0" {...field} />
                      <FormMessage withToast />
                    </FormItem>
                  )}
                />
                <span className="mx-2">-</span>
                <FormField
                  control={form.control}
                  name="valueTo"
                  render={({ field }) => (
                    <FormItem className="col-span-3">
                      <Input
                        id="valueFrom"
                        min={0}
                        type="number"
                        placeholder="999,999,999"
                        {...field}
                      />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="locality" className="text-right">
                Localitate
              </Label>
              <FormField
                control={form.control}
                name="locality"
                render={({ field }) => (
                  <FormItem className="col-span-3">
                    <Input
                      id="locality"
                      className="col-span-3"
                      placeholder="Baicoi..."
                      {...field}
                    />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <DialogFooter>
            <Button>Cauta</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}