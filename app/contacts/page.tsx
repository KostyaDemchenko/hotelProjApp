import { Suspense } from "react";

import Container from "@/components/Container";
import BookingForm from "@/components/Contacts/BookingForm";

export const dynamic = "force-dynamic";

export default function ContactsPage() {
  return (
    <Container className="py-12">
      <Suspense
        fallback={<p className="text-center py-24">Завантаження форми…</p>}
      >
        <BookingForm />
      </Suspense>
    </Container>
  );
}
