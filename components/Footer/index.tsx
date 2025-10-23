import Link from "next/link";
import Image from "next/image";

import imgObj from "@/public/images/utils";
import Container from "@/components/Container";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50 py-6 text-center text-sm text-muted-foreground">
      <Container className="flex items-center justify-center gap-[10px]">
        <Link
          className="text-xl font-bold tracking-tight text-primary"
          href="/"
        >
          <Image alt="logo" className="w-12" src={imgObj.logo} />
        </Link>
        <p className="text-center text-sm"> © 2025 Усі права захищені.</p>
      </Container>
    </footer>
  );
}
