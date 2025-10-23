import { Suspense } from "react";

import BookingForm from "@/components/Contacts/BookingForm";
import Container from "@/components/Container";

export default function ContactsPage() {
  return (
    <Container>
      <Suspense fallback={<div>Завантаження...</div>}>
        <BookingForm />
      </Suspense>
    </Container>
  );
}
