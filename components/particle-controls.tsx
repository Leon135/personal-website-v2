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
import { useEffect, useState } from "react";
import { ParticleSettings, defaultParticleSettings } from "@/lib/particle-settings";

export function ParticleControls({ settings, onChange, onSave }: { settings: ParticleSettings, onChange?: (settings: ParticleSettings) => void, onSave?: (settings: ParticleSettings) => void }) {
  const [particlesMultiplier, setParticlesMultiplier] = useState(settings.particlesMultiplier);
  const [particleVelocity, setParticleVelocity] = useState(settings.particleVelocity);
  const [particleSize, setParticleSize] = useState(settings.particleSize);
  const [connectionDistance, setConnectionDistance] = useState(settings.connectionDistance);
  const [scrollProgressMultiplier, setScrollProgressMultiplier] = useState(settings.scrollProgressMultiplier);

  const [isOpen, setIsOpen] = useState(false);

  // function handleSave() {
  //   const newSettings: ParticleSettings = {
  //     particlesMultiplier,
  //     particleVelocity,
  //     particleSize,
  //     connectionDistance,
  //     scrollProgressMultiplier,
  //   }
  //   onSave?.(newSettings);

  // }

  function handleChange() {
    const newSettings: ParticleSettings = {
      particlesMultiplier,
      particleVelocity,
      particleSize,
      connectionDistance,
      scrollProgressMultiplier,
    }
    onChange?.(newSettings);
  }

  function handleReset() {
    onChange?.(defaultParticleSettings);
  }

  useEffect(() => {
    handleChange();
  }, [particlesMultiplier, particleVelocity, particleSize, connectionDistance, scrollProgressMultiplier]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="text-muted-foreground absolute top-4 right-4 z-100 transition-all duration-200 animate-in fade-in-0 zoom-in-50 hover:opacity-80 active:opacity-60"
          hidden={isOpen}
        >
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col max-h-[95vh] sm:max-h-none sm:max-w-md sm:translate-x-0 sm:translate-y-0 sm:top-4 sm:right-4 sm:left-auto gap-2" disableOverlay={true}>
        <DialogHeader>
          <DialogTitle>Particle options</DialogTitle>
          <DialogDescription>Have fun with background. Be aware it can burn your browser!</DialogDescription>
        </DialogHeader>
        <FieldSet className="overflow-y-auto sm:overflow-visible">
          <FieldGroup>
            <Field>
              <FieldLabel>Particle count multiplier</FieldLabel>
              <FieldDescription>
                Adjust the number of particles in the background.
              </FieldDescription>
              <div className="text-sm">
                Multiplier: {particlesMultiplier}
              </div>
              <Slider value={[particlesMultiplier]} min={0} max={30} step={0.1} onValueChange={(value) => setParticlesMultiplier(value[0])} />
            </Field>
            <Field>
              <FieldLabel>Particle velocity</FieldLabel>
              <FieldDescription>
                Adjust how fast particles move around.
              </FieldDescription>
              <div className="text-sm">
                Velocity: {particleVelocity}
              </div>
              <Slider value={[particleVelocity]} min={0} max={10} step={0.1} onValueChange={(value) => setParticleVelocity(value[0])} />
            </Field>
            <Field>
              <FieldLabel>Particle size</FieldLabel>
              <FieldDescription>
                Adjust the size of each particle.
              </FieldDescription>
              <div className="text-sm">
                Size: {particleSize}
              </div>
              <Slider value={[particleSize]} min={0} max={10} step={0.1} onValueChange={(value) => setParticleSize(value[0])} />
            </Field>
            <Field>
              <FieldLabel>Connection distance</FieldLabel>
              <FieldDescription>
                Adjust how close particles need to be to connect with a line.
              </FieldDescription>
              <div className="text-sm">
                Distance: {connectionDistance}
              </div>
              <Slider value={[connectionDistance]} min={0} max={200} step={1} onValueChange={(value) => setConnectionDistance(value[0])} />
            </Field>
          </FieldGroup>
        </FieldSet>
        <DialogFooter className="sm:justify-start">
          {/* <DialogClose asChild>
            <Button type="button" onClick={() => handleSave()}>Save</Button>
          </DialogClose> */}
          <DialogClose asChild>
            <Button variant="outline" className="mt-4" onClick={() => handleReset()}>Reset</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
