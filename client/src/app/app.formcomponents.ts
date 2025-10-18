import { Type } from '@angular/core';

import { BooleanComponent } from 'src/app/form-components/boolean/boolean.component';
import { ButtonComponent } from 'src/app/form-components/button/button.component';
import { CodeComponent } from 'src/app/form-components/code/code.component';
import { DateComponent } from 'src/app/form-components/date/date.component';
import { EmailComponent } from 'src/app/form-components/email/email.component';
import { HtmlComponent } from 'src/app/form-components/html/html.component';
import { NumberComponent } from 'src/app/form-components/number/number.component';
import { PasswordComponent } from 'src/app/form-components/password/password.component';
import { PhotoComponent } from 'src/app/form-components/photo/photo.component';
import { PhotosComponent } from 'src/app/form-components/photos/photos.component';
import { SelectComponent } from 'src/app/form-components/select/select.component';
import { TagsComponent } from 'src/app/form-components/tags/tags.component';
import { TextComponent } from 'src/app/form-components/text/text.component';
import { TimeComponent } from 'src/app/form-components/time/time.component';

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
