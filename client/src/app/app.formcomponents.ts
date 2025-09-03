import { Type } from '@angular/core';

import { BooleanComponent } from 'src/app/formcomponents/boolean/boolean.component';
import { ButtonComponent } from 'src/app/formcomponents/button/button.component';
import { CodeComponent } from 'src/app/formcomponents/code/code.component';
import { DateComponent } from 'src/app/formcomponents/date/date.component';
import { EmailComponent } from 'src/app/formcomponents/email/email.component';
import { HtmlComponent } from 'src/app/formcomponents/html/html.component';
import { NumberComponent } from 'src/app/formcomponents/number/number.component';
import { PasswordComponent } from 'src/app/formcomponents/password/password.component';
import { PhotoComponent } from 'src/app/formcomponents/photo/photo.component';
import { PhotosComponent } from 'src/app/formcomponents/photos/photos.component';
import { SelectComponent } from 'src/app/formcomponents/select/select.component';
import { TagsComponent } from 'src/app/formcomponents/tags/tags.component';
import { TextComponent } from 'src/app/formcomponents/text/text.component';
import { TimeComponent } from 'src/app/formcomponents/time/time.component';

export const FORM_COMPONENTS: Record<string, Type<any>> = {
	Email: EmailComponent,
	Boolean: BooleanComponent,
	Button: ButtonComponent,
	Code: CodeComponent,
	Date: DateComponent,
	Html: HtmlComponent,
	Number: NumberComponent,
	Password: PasswordComponent,
	Photo: PhotoComponent,
	Photos: PhotosComponent,
	Select: SelectComponent,
	Tags: TagsComponent,
	Text: TextComponent,
	Time: TimeComponent,
};
