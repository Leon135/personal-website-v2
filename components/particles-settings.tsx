"use client";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

export function ParticleSettings() {
  const [particleMultiplierCount, setMultiplierParticleCount] = useState(1);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-4 right-4 z-100"
        >
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Particle options</DialogTitle>
          <DialogDescription>Have fun with background.</DialogDescription>
        </DialogHeader>
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel>Particle count</FieldLabel>
              <FieldDescription>
                Adjust the number of particles in the background.
              </FieldDescription>
              <Slider min={0} max={100} step={0.1} onValueChange={(value) => setMultiplierParticleCount(value[0])}/>
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <Button type="button">Save</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
