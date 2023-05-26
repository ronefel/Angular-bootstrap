import { Validators } from '@angular/forms';
import { isPresent } from '../util/lang';
export const lt = (value) => {
    return (control) => {
        if (!isPresent(value)) {
            return null;
        }
        if (isPresent(Validators.required(control))) {
            return null;
        }
        const v = +control.value;
        return v < +value ? null : { lt: { value: value } };
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdG9yLmpzIiwic291cmNlUm9vdCI6Ii4uLy4uLy4uLyIsInNvdXJjZXMiOlsic3JjL2FwcC9sZXNzLXRoYW4vdmFsaWRhdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBa0QsVUFBVSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUYsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV6QyxNQUFNLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUFhLEVBQWUsRUFBRTtJQUMvQyxPQUFPLENBQUMsT0FBd0IsRUFBb0IsRUFBRTtRQUNwRCxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLFNBQVMsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEVBQUU7WUFDM0MsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUVELE1BQU0sQ0FBQyxHQUFXLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQztRQUNqQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDO0lBQ3RELENBQUMsQ0FBQztBQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFic3RyYWN0Q29udHJvbCwgVmFsaWRhdGlvbkVycm9ycywgVmFsaWRhdG9yRm4sIFZhbGlkYXRvcnMgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQgeyBpc1ByZXNlbnQgfSBmcm9tICcuLi91dGlsL2xhbmcnO1xuXG5leHBvcnQgY29uc3QgbHQgPSAodmFsdWU6IG51bWJlcik6IFZhbGlkYXRvckZuID0+IHtcbiAgcmV0dXJuIChjb250cm9sOiBBYnN0cmFjdENvbnRyb2wpOiBWYWxpZGF0aW9uRXJyb3JzID0+IHtcbiAgICBpZiAoIWlzUHJlc2VudCh2YWx1ZSkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBpZiAoaXNQcmVzZW50KFZhbGlkYXRvcnMucmVxdWlyZWQoY29udHJvbCkpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2OiBudW1iZXIgPSArY29udHJvbC52YWx1ZTtcbiAgICByZXR1cm4gdiA8ICt2YWx1ZSA/IG51bGwgOiB7IGx0OiB7IHZhbHVlOiB2YWx1ZSB9IH07XG4gIH07XG59O1xuIl19