import "./alpine";

type Item = {
    isDir: boolean,
    modTime: string,
    size: string
    url: string
};

const removeChildSelected = (selected: HTMLTableRowElement) => {
    const open = selected.getAttribute('data-open') as string;
    const inner = selected.getAttribute('data-inner') as string;
    // remove all tr elements with the same data-collapse attribute from parent
    const elements = selected.parentElement?.querySelectorAll(`tr[data-collapse="${open}-${inner}"]`);
    elements?.forEach((element) => {
        // check if element is loaded
        if (element.getAttribute('data-loaded') == 'true') {
            // remove all children
            removeChildSelected(element as HTMLTableRowElement);
        }

        element.remove();
    });
}

const listDir = async (e: Event) => {
    // check if event type is a HTMLTableCellElement
    if (e.target instanceof HTMLTableCellElement) {
        (e.target as HTMLTableCellElement).parentElement?.click();
        return;
    }

    try {
        // get data from button
        const selected = e.target as HTMLTableRowElement;
        const loaded = selected.getAttribute('data-loaded');

        // if data is already loaded, remove it
        if (loaded == 'true') {
            removeChildSelected(selected);

            selected.setAttribute('data-loaded', 'false');

            const iconModify = (selected.firstElementChild as HTMLTableCellElement)
            iconModify.innerText = iconModify.innerText.replace('📂', '📁');

            return;
        }

        const url = selected.getAttribute('data-url') as string;
        const dataType = selected.getAttribute('data-type') as string;
        if (dataType == 'file') {
            window.open(url, '_blank');
            return;
        }

        const result = await fetch(url).then(async (response) => {
            const j: Record<string, Item> = await response.json();
            return j
        });

        // add data to button as attribute to show it's already loaded
        selected.setAttribute('data-loaded', 'true');

        const iconModify = (selected.firstElementChild as HTMLTableCellElement)
        iconModify.innerText = iconModify.innerText.replace('📁', '📂');

        const inner = +(selected.getAttribute('data-inner') as string);
        const open = selected.getAttribute('data-open') as string;
        // create tr element and add it to the table
        Object.keys(result).forEach((name: string) => {
            const tr = document.createElement('tr');
            tr.classList.add('item-list');
            tr.setAttribute('data-collapse', `${open}-${inner}`);
            tr.setAttribute('data-type', result[name].isDir ? 'dir' : 'file');
            tr.setAttribute('data-url', result[name].url);
            tr.setAttribute('data-inner', (inner + 1).toString());
            tr.innerHTML = `<td style="padding-left: ${inner * 1}rem">${result[name].isDir ? "📁" : "📄"} ${name}</td> <td>${result[name].size}</td> <td>${result[name].modTime}</td>`;
            selected.parentNode?.insertBefore(tr, selected.nextSibling);
        });
    } catch (e) {
        console.error(e);
    }
};

(window as any).listDir = listDir;
