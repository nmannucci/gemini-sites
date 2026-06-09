// Source: house36_bbt_contact_data() + contact helper functions.
// phone_href in PHP is the bare digit string '9164655551';
// house36_bbt_contact_phone_href() returns 'tel:' . phone_href
// house36_bbt_contact_email_href() returns 'mailto:' . email
export interface Contact {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
}

export const contact: Contact = {
  phone: '916-465-5551',
  phoneHref: 'tel:9164655551',
  email: 'trainwithbbt@gmail.com',
  emailHref: 'mailto:trainwithbbt@gmail.com',
};
