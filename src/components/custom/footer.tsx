import Link from "next/link";
import { Button } from "../ui/button";

export default function Footer() {
  return (
    <footer className="p-6  text-center bg-accent text-accent-foreground">
      <p className="text-sm">
        © {new Date().getFullYear()} Referral Tree Manager. All rights reserved.
      </p>
      <div className="mt-2 ">
        Built by
        <a
          href="https://mutugikelvin.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          title="kelvin"
          className="inline-block"
        >
          <Button variant="link" className="">
            Kelvin
          </Button>
        </a>
      </div>
    </footer>
  );
}
